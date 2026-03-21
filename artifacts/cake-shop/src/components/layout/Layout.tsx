import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CartDrawer } from "../CartDrawer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-grow flex flex-col pt-20 relative z-10">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
