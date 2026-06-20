# Vercel Deployment

This repository is ready for a temporary public deployment through Vercel.

## Import steps

1. Sign in to [Vercel](https://vercel.com/).
2. Open [New Project](https://vercel.com/new).
3. Import `michaelsongle2019-gif/healthcare`.
4. Keep the detected framework as `Next.js`.
5. Add the environment variables below.
6. Click `Deploy`.

## Required environment variables

```bash
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
SESSION_SECRET=replace-with-a-long-random-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ChangeMe123!
ADMIN_DISPLAY_NAME=Site Administrator
```

## Notes

- The public-facing catalog should work well for temporary internet access.
- The hosted deployment uses temporary writable storage, so do not treat runtime uploads and backups on Vercel as permanent storage.
- Preferred update flow: edit repository content, push to GitHub, and let Vercel redeploy automatically.
