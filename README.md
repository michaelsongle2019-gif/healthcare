# Healthcare Product Website

Bilingual medical company website built with Next.js. It includes:

- Public CN/EN brand site
- Product center and product detail pages
- Public and request-gated document center
- News, certifications, and contact pages
- Internal admin console for updating products, documents, news, and site settings
- SQLite-backed content storage with audit logs and backup support

## Local setup

1. Copy `.env.example` to `.env.local`
2. Adjust the values if needed
3. Install dependencies:

```bash
npm install
```

4. Start the site:

```bash
npm run dev
```

5. Open:

- Public site: `http://localhost:3000/en`
- Admin login: `http://localhost:3000/admin/login`

Default admin credentials:

- Username: `admin`
- Password: `ChangeMe123!`

Change them through environment variables before production use.

## Production

Build and run:

```bash
npm run build
npm run start
```

Recommended production setup:

- Linux or Windows cloud VM with Node.js 20+
- Reverse proxy with HTTPS
- Persistent volume for `data/`
- CDN in front of the public domain
- Change `SESSION_SECRET` and admin credentials
- Restrict admin access if needed by IP or VPN

## Temporary public deployment with Vercel

This project can be published quickly through GitHub + Vercel for external viewing.

- The public product site works well for temporary internet access.
- Product updates can be handled by editing repository content and redeploying.
- Vercel preview/production uses temporary writable storage, so admin-created uploads and backups are not meant to be the long-term workflow there.
- For reliable long-term admin editing, keep using a VM or move the writable data layer to managed storage later.

Recommended Vercel environment variables:

```bash
SESSION_SECRET=replace-with-a-long-random-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ChangeMe123!
ADMIN_DISPLAY_NAME=Site Administrator
```

Notes:

- `NEXT_PUBLIC_SITE_URL` is optional on Vercel. The app can automatically use Vercel system domain variables when they are exposed.
- `DATABASE_FILE` can be omitted on Vercel. The app will automatically use temporary writable storage there.
- Do not rely on runtime public file uploads on Vercel for permanent assets. For this temporary deployment flow, update product content through the repository instead.
- A short click-through guide is available in `docs/vercel-deploy.md`.

## Backups

Create a database backup from the admin overview page or run:

```bash
npm run backup
```
