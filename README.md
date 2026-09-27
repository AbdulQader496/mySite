# Terminal Portfolio

Personal portfolio of **Gulam M. A. Qader**, DevOps Engineer, styled as an interactive terminal session.

**Live:** deployed on Cloudflare Workers

- Built with React + Vite, no UI libraries
- Interactive command prompt (`help`, `projects`, `contact`, …) and typed-out sections
- ASCII-art portrait generated in the browser from a photo
- Deployed on Cloudflare Workers (static assets), rebuilt automatically on every push to `main`

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

All content lives in [`src/data.js`](src/data.js).
