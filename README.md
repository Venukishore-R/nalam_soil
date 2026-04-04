# Nalam Soil

A comprehensive soil nutrient analysis platform that pairs a React/Tailwind frontend with a TypeScript/Express + SQLite backend so farmers get crop-specific NPK recommendations and yield estimates.

## Prerequisites

- Node.js **v18 or higher** (LTS recommended)
- npm (v10+) or yarn
- Git for cloning the repo

## Project layout

- `nalam_soil_backend/` – Express + TypeScript API that talks to `better-sqlite3` and exposes `/api` routes
- `nalam_soil_frontend/` – Vite-powered React app (Ant Design + Tailwind) that calls the backend
- `README.md` files inside each application for deeper API or UI documentation

## Quick start

1. **Clone and enter the project root**

   ```bash
   git clone <repository-url>
   cd nalam_soil
   ```

2. **Install dependencies**

   ```bash
   cd nalam_soil_backend
   npm install
   cd ../nalam_soil_frontend
   npm install
   cd ..
   ```

3. **Run the backend**

   ```bash
   cd nalam_soil_backend
   npm run dev
   ```

   - Listens on `http://localhost:6001`
   - The bundled SQLite file (`nalam_soil_backend/nalam_soil.db`) ships with the schema and sample data; no additional migration steps are required.
   - Use `PORT=1234 npm run dev` if you need a different port.
   - Dev mode skips a build, but if you need a production-like run or want to use the compiled output, run `npm run build` before `npm run start`.

4. **Run the frontend** (new terminal)

   ```bash
   cd nalam_soil_frontend
   npm run dev
   ```

   - Vite serves the UI on `http://localhost:5173` by default.
   - The frontend expects the backend at `http://localhost:6001/api` (see `src/lib/api.ts` for overrides if you change ports).

5. **Browse the app**

   Open `http://localhost:5173` in your browser. User registration/login, soil testing, and recommendations will work once both services are running.

## Alternative workflows

- **Backend production**: `cd nalam_soil_backend && npm run build && npm run start`
- **Frontend preview**: `cd nalam_soil_frontend && npm run build && npm run preview`
- **Healthcheck**: `curl http://localhost:6001/health` returns `{ status: "OK" }`
-
- Read `nalam_soil_backend/README.md` for detailed API docs and `nalam_soil_frontend/README.md` for UI-specific instructions.

## Features

- User authentication (register/login via `/api/register` and `/api/login`)
- Soil test engine that analyzes nitrogen, phosphorus, potassium and returns fertilizer advice
- Crop-specific recommendations for Paddy, Sorghum, Sugarcane, Radish, Tapioca
- Responsive React/Tailwind UI with Ant Design components
- Type-safe backend powered by Zod schemas and SQLite persistence

## Developing

- Backend hot-reloads with `ts-node-dev`
- Frontend uses Vite’s dev server for instant refreshes
- Keep both terminals alive while working: backend on :6001, frontend on :5173

## Contributing

1. Fork the repo
2. Create a descriptive branch (e.g., `feat/soil-recommendation`)
3. Make your changes and run the respective `npm run dev` to verify
4. Open a pull request with testing notes

## License

This project is licensed under the MIT License.
