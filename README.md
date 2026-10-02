# Expense Tracker

A full-stack personal finance tracker built as an internship project. Record
income and expenses in Ethiopian Birr, then read a dashboard of balance, cash
flow, spending by category and income by source.

**Live app:** https://expense-tracker-beige-nine-24.vercel.app
**API:** https://expense-tracker-api.onrender.com/api/health

## Stack

| Layer    | Tech                                                        |
| -------- | ----------------------------------------------------------- |
| Frontend | React 19, Vite 7, Tailwind CSS 4, Recharts, React Router 7  |
| Backend  | Node 22, Express 5, Mongoose 8, JWT auth, Multer, SheetJS   |
| Database | MongoDB (Atlas or local)                                    |

## Features

- Email + password accounts with JWT sessions and bcrypt hashing
- Dashboard: total balance, income, expense, savings rate
- Cash-flow donut, spending-by-category bars, income-by-source breakdown
- Income and expense lists with per-entry delete and Excel export
- Emoji icons per entry, optional profile photo upload
- Responsive down to phone widths; ink-on-white interface with semantic
  green/red money colours and a faint ETB coin-and-banknote watermark behind
  every screen

## Repository layout

```
Expense Tracker/
  backend/    Express API (Mongoose models, controllers, routes)
  frontend/expense-tracker/   Vite + React client
render.yaml   Render blueprint for the API
Intership Report.pdf          Project documentation
```

## Running locally

Requirements: Node 18+ and a MongoDB server (local or Atlas).

**1. Backend**

```bash
cd "Expense Tracker/backend"
cp .env.example .env       # then set MONGO_URL and JWT_SECRET
npm install
npm run dev                # http://localhost:8000
```

**2. Frontend** (second terminal)

```bash
cd "Expense Tracker/frontend/expense-tracker"
cp .env.example .env.local # VITE_API_BASE_URL defaults to http://localhost:8000
npm install
npm run dev                # http://localhost:5173
```

## Environment variables

Backend (`Expense Tracker/backend/.env`, see `.env.example`):

| Variable     | Purpose                                     |
| ------------ | ------------------------------------------- |
| `MONGO_URL`  | MongoDB connection string                   |
| `JWT_SECRET` | Signs auth tokens; long random string       |
| `PORT`       | API port (Render injects this)              |
| `CLIENT_URL` | Origin allowed by CORS                      |

Frontend (`VITE_API_BASE_URL`): the API origin the client calls. It is baked
into the browser bundle, so it is public by nature — `.env.production` holds
the deployed value.

## Deployment

- **Frontend → Vercel:** project `expense-tracker`. `vercel.json` sets the Vite
  build and SPA rewrites. In project Settings → General, **Root Directory must
  be `Expense Tracker/frontend/expense-tracker`** — left at `.`, every
  Git-triggered build fails in seconds because the repository root has no
  `package.json`.
- **Backend → Render:** create a New Blueprint from this repository.
  `render.yaml` supplies the service name, root directory, build and start
  commands, health check and `CLIENT_URL`; you only paste `MONGO_URL`. Keep the
  service named `expense-tracker-api` — that origin is baked into the client
  bundle through `.env.production`, so renaming it means rebuilding the
  frontend too.

## Known limitations

- Profile images are written to the container's `uploads/` directory, which is
  ephemeral on Render's free tier — uploads disappear on redeploy. Object
  storage (S3 or Render Disk) is the fix.
- The API's original Atlas connection string, including its database password,
  was committed to this repository and is still readable in git history even
  though the file is now untracked. Rotate that Atlas user's password and let
  Render generate a fresh `JWT_SECRET` before trusting the deployment with real
  data.
