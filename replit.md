# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.
This project is a full-stack premium cake e-commerce website called **Sweet Cakes - Premium Bakery**.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: In-memory mock data (no external DB required)
- **Frontend**: React + Vite + Tailwind CSS
- **State Management**: React Context API (AuthContext, CartContext)
- **Forms**: react-hook-form + @hookform/resolvers
- **Animations**: framer-motion
- **Routing**: Wouter
- **API codegen**: Orval (from OpenAPI spec)
- **Validation**: Zod, drizzle-zod

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   │   ├── src/
│   │   │   ├── data/       # Mock data store (products, users, cart, orders, reviews)
│   │   │   ├── lib/        # JWT utilities, logger
│   │   │   ├── middleware/ # Auth middleware (Bearer token)
│   │   │   └── routes/     # products, auth, cart, orders, reviews
│   └── cake-shop/          # React + Vite frontend
│       └── src/
│           ├── contexts/   # AuthContext, CartContext
│           ├── components/ # Navbar, Footer, ProductCard, CartDrawer, Layout
│           ├── pages/      # Home, Products, ProductDetail, Checkout, OrderConfirmation, Orders, Auth
│           └── index.css   # Warm bakery design tokens
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM (not used currently, mock data only)
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Features

1. Homepage with hero banner, featured cakes, categories, testimonials
2. Product listing with filters (category, price range, rating), search, sort
3. Product detail page with image gallery, reviews, add-to-cart
4. Cart drawer (slide-in) with quantity controls and total
5. Checkout page with address form + payment method selection
6. Order confirmation page with order summary
7. User authentication (signup/login, JWT-based)
8. My Orders page (auth required)
9. Responsive design (mobile + desktop)
10. Loading states, error handling, toast notifications

## API Routes

All routes prefixed with `/api`:

- `GET /healthz` — Health check
- `GET /products` — List all products (filters: category, minPrice, maxPrice, minRating, search, sortBy)
- `GET /products/featured` — Featured products
- `GET /products/:id` — Product detail
- `GET /categories` — List categories
- `POST /auth/register` — Register user
- `POST /auth/login` — Login user
- `GET /auth/me` — Get current user (auth required)
- `GET /cart` — Get cart (auth required)
- `POST /cart` — Add to cart (auth required)
- `PUT /cart/:productId` — Update cart item (auth required)
- `DELETE /cart/:productId` — Remove from cart (auth required)
- `DELETE /cart/clear` — Clear cart (auth required)
- `GET /orders` — List user orders (auth required)
- `POST /orders` — Create order (auth required)
- `GET /orders/:id` — Get order (auth required)
- `GET /products/:productId/reviews` — Get reviews
- `POST /products/:productId/reviews` — Create review (auth required)

## TypeScript & Composite Projects

Every lib package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all lib packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client and Zod schemas from OpenAPI spec

## Packages

### `artifacts/api-server` (`@workspace/api-server`)
Express 5 API server with mock in-memory data. Uses JWT for auth (no external DB needed).

### `artifacts/cake-shop` (`@workspace/cake-shop`)
React + Vite frontend. Uses Context API for auth/cart state. All API calls via generated React Query hooks.

### `lib/api-spec` (`@workspace/api-spec`)
OpenAPI 3.1 spec with all cake shop endpoints. Run `pnpm --filter @workspace/api-spec run codegen` after changes.
