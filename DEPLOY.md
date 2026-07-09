# Toji Portfolio — Deploy to Vercel

This is a single Vercel project containing both pieces:
- **Frontend**: Vite + React + TypeScript at the repo root (`src/`, `index.html`)
- **Backend**: Express + MongoDB, running as a Vercel serverless function (`api/index.js` → `server/app.js`)

Both are served from the same domain, so the frontend just calls `/api/...` — no CORS setup needed.

## What changed from the original zip

- Flattened `toji/portfolio/portfolio` → repo root, and `toji/portfolio/backend/src` → `server/`
- Removed `node_modules` and `.git` (don't commit these — Vercel installs fresh)
- Removed two unused stub files (`socket/`, `jobs/`) — placeholders that weren't wired into the app
- `server/config/db.js`: MongoDB connection is now cached across function invocations, instead of reconnecting on every request (required for serverless — otherwise you'd exhaust Atlas's connection limit in minutes)
- `server/config/logger.js`: no longer tries to write log files to disk in production — Vercel's filesystem is read-only, so this would have crashed every request. Logs go to stdout, which Vercel captures automatically.
- Added `api/index.js` as the serverless entry point, and `vercel.json` so client-side routing (React Router) works on page refresh/deep links.
- Added `local-server.js` so you can still run the full backend locally with `npm run dev:server` (Vercel doesn't use this file — it's for your convenience only).

## 1. Get a MongoDB Atlas connection string (free tier is fine)

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a free (M0) cluster.
3. Under **Database Access**, add a database user with a password.
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) — required since Vercel's serverless IPs aren't static.
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
6. Add a database name before the `?`, e.g. `.../portfolio?retryWrites=true...`

## 2. Push this project to GitHub

```bash
cd deploy
git init
git add .
git commit -m "Clean deploy-ready structure"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## 3. Import into Vercel

1. Go to https://vercel.com/new and import the GitHub repo.
2. Vercel will auto-detect **Vite** as the framework — leave the build settings as default (`npm run build`, output `dist`).
3. Before deploying, open **Environment Variables** and add everything from `.env.example`:

| Variable | Required | Notes |
|---|---|---|
| `MONGO_URI` | ✅ | from step 1 |
| `JWT_ACCESS_SECRET` | ✅ | use the generated value in `.env.example`, or make your own |
| `JWT_REFRESH_SECRET` | ✅ | same |
| `NODE_ENV` | ✅ | `production` |
| `COOKIE_DOMAIN` | recommended | your Vercel domain once you know it, e.g. `your-app.vercel.app` |
| `CLOUDINARY_*` | only if using image uploads | from cloudinary.com dashboard |
| `SMTP_*`, `EMAIL_FROM`, `OWNER_EMAIL` | only if using the contact form's email notifications | from your email provider (Gmail app password, Resend, SendGrid, etc.) — until set, submissions still save to MongoDB, emails are just skipped |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | only if seeding an admin login | used by `npm run seed` |

4. Click **Deploy**.

## 4. After the first deploy

- Visit `https://your-app.vercel.app/api/health` — should return a JSON success response confirming the API and DB connection work.
- If you set `COOKIE_DOMAIN`, go back and set it to your actual Vercel domain, then redeploy (Vercel → Deployments → ⋯ → Redeploy).
- To seed an initial admin user for the dashboard, run locally with your production `MONGO_URI` in `.env`: `npm run seed`.

## Local development

```bash
npm install
cp .env.example .env   # fill in MONGO_URI at minimum
npm run dev:server     # starts the API on :5000
npm run dev            # starts Vite on :5173, proxying /api to :5000
```
