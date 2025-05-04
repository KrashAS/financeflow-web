# 💼 financeflow-web

**financeflow-web** is a custom admin panel built for managing users, content, logs, and system settings in real time. Designed for internal use by teams, it provides a fast, modern interface that interacts with the backend via REST APIs.

---

## ⚙️ Tech Stack

-   **Next.js 15** – server/client rendering, routing, optimization
-   **React 19** – component-based UI architecture
-   **TypeScript** – strict type safety and developer experience
-   **Redux** (without RTK) – global state management
-   **Tailwind CSS** – utility-first styling
-   **NextAuth.js** – authentication via credentials
-   **WebSockets** – real-time updates (e.g. live log viewer)
-   **REST API** – primary data communication
-   **Custom React Hooks** – reusable logic
-   **SCSS / CSS Variables** – theme flexibility and overrides

---

## 🚀 Features

-   🔐 **Authentication system** – login and registration
-   📊 **Dashboard** – overview of data and key metrics
-   👤 **User management** – list, edit, delete users
-   🧾 **Dynamic form rendering**
-   📜 **Log Viewer** – optimized to handle millions of lines with virtual scroll
-   🧠 **Sidebar navigation** – collapsible with outside click detection
-   🔍 **Search, filter, and sort** across data sets
-   🌗 **Dark/light mode toggle**
-   🖱️ **Drag & drop** for reordering items
-   🔄 **Auto updates via WebSocket** for live components
-   🖼️ **Image uploader** – stores image and returns `image_id`
-   🧱 **Modular architecture** – components and logic split by domain

---

## 📁 Project Structure

```
├── app/ # Next.js 14 App Router structure
├── components/ # Reusable UI components
├── constants/ # Global constants
├── lib/ # Logic utilities (e.g. API, auth, etc.)
├── prisma/ # Prisma schema and DB config
├── public/ # Static assets (images, fonts, etc.)
├── styles/ # Global styles and Tailwind config
├── types/ # Global TypeScript types
├── utils/ # Helpers and utility functions
├── .github/workflows/ # GitHub Actions CI/CD workflows
├── .env, .env.local # Environment variables
├── docker-compose.yml # Docker service configuration
├── Dockerfile # Docker build config
├── next.config.ts # Next.js config
├── postcss.config.mjs # PostCSS plugins for Tailwind
├── tailwind.config.ts # Tailwind CSS setup
├── tsconfig.json # TypeScript compiler config
└── README.md # Project documentation
```

---

## 🧪 Dev Notes

-   Built for performance: SSR + client-side rendering
-   Full support for real-time interactions and async flows
-   Theming powered by Tailwind and CSS variables
-   Organized by domain and functionality

---

## 🔒 Security

-   Session-based auth with NextAuth
-   Middleware-based route protection
-   Input validation both on client and server
