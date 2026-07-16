# Deployment

The production build is generated with `npm run build` and published from `dist`.

- `VITE_BASE_PATH` defaults to `./`, so one build works on Vercel, the custom domain, and GitHub project Pages.
- `VITE_ASSET_BASE_URL` defaults to empty, so media remains on the same origin. Set it to an HTTPS CDN origin at build time to prefix existing `assets/...` media URLs without changing routes or layout.
- GitHub Pages installs with `npm ci`, validates the production bundle, and deploys only `dist`.
- Vercel uses `vercel.json` for the same build and cache policy.

Example CDN test:

```bash
VITE_ASSET_BASE_URL=https://cdn.example.com npm run build
```
