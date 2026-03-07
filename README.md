# Nalam Soil Farmer Portal

This project contains a lightweight **Node.js** backend and a **React/Vite** frontend for farmer registration and login.

## Backend (`nalam_soil_backend`)

 - Built with **Express.js** and compiled from TypeScript (`src/index.ts`). Express handles JSON parsing and CORS before handing requests to the router.
 - Folder layout:
   - `config/` boots the Prisma-powered SQLite database.
  - `models/` encapsulate CRUD helpers plus the shared `.d.ts` type file for server payloads.
  - `services/` contain the business logic for registration and login (validation + persistence).
  - `controllers/` orchestrate the HTTP layer by calling the services and returning responses.
   - `middleware/` protects the routes with the `X-App-Secret` header.
   - `router/` wires `/register` and `/login`.
   - `utils/` shares the JSON responder helper.
 - SQLite/Prisma: `prisma/schema.prisma` defines the `Farmer` model plus the `LandUnit` enum; `config/database.ts` initializes the Prisma client against `data/farmers.db`. `cropCategories` is stored natively as JSON.
 - Environment variables (see `nalam_soil_backend/.env`):
   - `APP_SECRET` (default `open-sesame`) must match `VITE_APP_SECRET` used by the frontend.
   - `DATABASE_URL` (default `file:./data/farmers.db`) points Prisma at the SQLite file.
   - `PORT` (default `4000`) controls where Express listens.
 - Installation/build steps:
   ```bash
   cd nalam_soil_backend
   npm install            # installs Express, Prisma, and TypeScript; requires internet
   npx prisma generate
   npx prisma db push     # creates/migrates the SQLite file
   npm run build
   npm start
   ```
 - For development (no build) run `npm run dev`.

## Frontend (`nalam_soil_frontend`)

- React + Vite UI with registration and login forms.
- Reads:
  - `VITE_API_BASE` to locate the backend (defaults to `http://localhost:4000/api`).
  - `VITE_APP_SECRET` to keep in sync with `APP_SECRET` (defaults to `open-sesame`).
- To run:
  ```bash
  cd nalam_soil_frontend
  npm install
  npm run dev
  ```

## Flow

1. Register a farmer with their name, mobile number, password, village, district, landholding (value + unit), and comma-separated crop list.
2. Use the registered mobile number and password to log in, which shows a summary card with the farmer's contact info.
