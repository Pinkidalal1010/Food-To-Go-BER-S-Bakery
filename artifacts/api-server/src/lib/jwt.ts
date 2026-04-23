const SECRET = process.env.JWT_SECRET || "sweet-cakes-secret-key-2025";

export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

function base64UrlEncode(data: string): string {
  return Buffer.from(data)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function base64UrlDecode(data: string): string {
  const pad = data.length % 4;
  const padded = pad ? data + "=".repeat(4 - pad) : data;
  return Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString();
}

import { createHmac } from "crypto";

function sign(data: string): string {
  return createHmac("sha256", SECRET).update(data).digest("base64url");
}

export function generateToken(payload: JwtPayload): string {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(JSON.stringify({ ...payload, iat: Date.now(), exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
  const signature = sign(`${header}.${body}`);
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, body, sig] = parts;
    const expectedSig = sign(`${header}.${body}`);
    if (sig !== expectedSig) return null;

    const payload = JSON.parse(base64UrlDecode(body));
    if (payload.exp && payload.exp < Date.now()) return null;

    return { userId: payload.userId, email: payload.email, name: payload.name, role: payload.role };
  } catch {
    return null;
  }
}
