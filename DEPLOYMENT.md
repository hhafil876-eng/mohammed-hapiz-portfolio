# Mohammed Hapiz — Production Deployment Guide

This portfolio has been engineered as a high-performance, production-ready Single Page Application (SPA) utilizing Vite, React 18, Three.js (WebGL), Framer Motion, and Tailwind CSS.

---

## 1. Production Architecture & Assets

- **Bundler**: Vite 5 with manual vendor chunk splitting (`three`, `framer-motion`, `lucide-react`).
- **Main JavaScript Bundle**: ~221 kB (~65 kB gzipped).
- **Core Assets**:
  - `public/favicon.svg` — Custom luxury monogram favicon.
  - `public/robots.txt` — Search engine crawler directives.
  - `public/sitemap.xml` — Canonical XML sitemap.
  - `public/assets/mohammed-hapiz-resume.pdf` (305 kB) — Official verifiable curriculum vitae.
  - `public/assets/hapiz-portrait.webp` (67 kB) & `hapiz-portrait.png` (361 kB) — High-res transparent cutouts.
- **Routing & Rewrite Configs**:
  - `vercel.json` — Pre-configured for Vercel SPA rewrites and asset caching headers.
  - `netlify.toml` — Pre-configured for Netlify redirects and static publication.
  - `.gitignore` — Standard production ignore configuration.

---

## 2. Deploy to Vercel (Recommended)

### Method A: Via Vercel Web Dashboard (Zero CLI)
1. Push this repository to your GitHub account (`https://github.com/hhafil876-eng/portfolio`).
2. Log into [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Keep the default build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**. Your portfolio will go live with automatic global CDN distribution and SSL.

### Method B: Via Vercel CLI
```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Navigate to the project root and deploy
cd C:\Users\ADMIN\.gemini\antigravity\scratch\hapiz-portfolio
vercel
```

---

## 3. Deploy to Netlify

### Method A: Via Netlify Git Integration
1. Go to [app.netlify.com](https://app.netlify.com/) and click **"Add new site"** → **"Import an existing project"**.
2. Select GitHub and choose your repository.
3. Netlify will automatically detect `netlify.toml`:
   - **Base directory**: (empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **"Deploy site"**.

### Method B: Via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

---

## 4. Deploy to GitHub Pages

### Method A: Automated GitHub Actions Workflow
Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

In GitHub Repository Settings:
- Go to **Settings** → **Pages** → **Build and deployment** → Set **Source** to **GitHub Actions**.

---

## 5. Custom Domain Configuration (e.g. `mohammadhapiz.me`)

To bind your personal domain:
1. In your Vercel or Netlify project settings, navigate to **Domains**.
2. Add `mohammadhapiz.me` and `www.mohammadhapiz.me`.
3. In your DNS provider (e.g., Cloudflare, Namecheap, GoDaddy), add the corresponding DNS records:
   - **Apex domain (`@`)**: `A` record pointing to `76.76.21.21` (for Vercel) or `104.198.14.52` (for Netlify).
   - **Subdomain (`www`)**: `CNAME` record pointing to `cname.vercel-dns.com` or your Netlify subdomain.
4. SSL certificates are provisioned automatically via Let's Encrypt within 5–15 minutes.

---

## 6. Contact Form Configuration

The contact form is configured to dispatch via FormSubmit and Web3Forms:
- Default endpoint: `https://formsubmit.co/ajax/hhafil876@gmail.com`
- Fallback: Pre-filled `mailto:hhafil876@gmail.com` and quick clipboard draft copy.
- Optional Web3Forms Access Key:
  To use a custom Web3Forms access key, create a `.env` file in the project root:
  ```env
  VITE_WEB3FORMS_ACCESS_KEY="your-access-key-here"
  ```

---

## 7. Local Testing & Verification

```bash
# 1. Run local development server
npm run dev

# 2. Build for production
npm run build

# 3. Preview production build locally
npm run preview
```
