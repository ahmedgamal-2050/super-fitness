# GitHub Pages Deployment Documentation

This document provides complete instructions for building, testing, and deploying the **Super Fitness** Angular application to **GitHub Pages**.

---

## Live Target URL

- **Live Application URL:** [https://ahmedgamal-2050.github.io/super-fitness/](https://ahmedgamal-2050.github.io/super-fitness/)

---

## 🚀 How to Deploy

Deployment to GitHub Pages is fully automated via GitHub Actions using [.github/workflows/deploy.yml](file:///d:/work/Elevate/super-fitness/.github/workflows/deploy.yml).

### Step-by-Step Instructions

1. **Enable GitHub Actions for Pages:**
   - Go to your repository on GitHub: `ahmedgamal-2050/super-fitness`
   - Open **Settings** > **Pages**
   - Under **Build and deployment**, set **Source** to **`GitHub Actions`**

2. **Deploy by Pushing Code:**
   Run the following commands in your terminal:
   ```bash
   git add .
   git commit -m "Deploy super-fitness application to GitHub Pages"
   git push origin main
   ```

3. **View Deployment Progress:**
   - Go to the **Actions** tab in your GitHub repository to watch the build and deployment workflow.
   - Once completed, your application will be live at: [https://ahmedgamal-2050.github.io/super-fitness/](https://ahmedgamal-2050.github.io/super-fitness/)

---

## 🛠️ Automated Workflow Details

The workflow in [.github/workflows/deploy.yml](file:///d:/work/Elevate/super-fitness/.github/workflows/deploy.yml) handles:

1. **Subpath Base Href**: Builds the Angular application with `--base-href=/super-fitness/` so JS/CSS assets and routing work under the GitHub Pages subpath.
2. **SPA Client-Side Routing (404 Fallback)**: Automatically copies `index.html` to `404.html` in the build directory so direct links and page refreshes load correctly without 404 errors.

---

## 🧪 Local Build & Preview

Before pushing, you can test the production build locally:

### 1. Build for Production

```bash
npx nx build super-fitness --configuration=production
```

### 2. Local Production Preview

```bash
npx nx run super-fitness:serve-static
```

Hosts the static production bundle locally at `http://localhost:4200`.
