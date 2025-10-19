# 🚀 Quick GitHub Pages Deployment

## Option 1: Using gh-pages Package (Recommended)

1. **Update package.json with your GitHub repository URL:**
   ```bash
   cd frontend
   ```
   
   Edit `package.json` and change:
   ```json
   "homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME"
   ```

2. **Install gh-pages:**
   ```bash
   yarn add -D gh-pages
   ```

3. **Add deploy scripts to package.json:**
   ```json
   "scripts": {
     "start": "craco start",
     "build": "craco build",
     "test": "craco test",
     "predeploy": "yarn build",
     "deploy": "gh-pages -d build"
   }
   ```

4. **Initialize Git and deploy:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git branch -M main
   git push -u origin main
   
   # Deploy to GitHub Pages
   yarn deploy
   ```

5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Click Save

Your app will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME`

---

## Option 2: Using GitHub Actions (Automated)

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: GitHub Actions

3. **Push changes - GitHub Actions will automatically deploy!**

The workflow file is already included at `.github/workflows/deploy.yml`

---

## Important Files Already Updated:

✅ **App.js** - Changed from BrowserRouter to HashRouter for GitHub Pages compatibility
✅ **package.json** - Added `"homepage": "."` for relative paths
✅ **.github/workflows/deploy.yml** - GitHub Actions workflow for automatic deployment

---

## Testing Locally Before Deploy:

```bash
cd frontend
yarn build
npx serve -s build
```

Visit `http://localhost:3000` to test the production build.

---

## Troubleshooting:

**Blank Page:**
- Make sure `homepage` in package.json matches your GitHub Pages URL
- Clear browser cache
- Check browser console for errors

**Routes Not Working:**
- The app now uses HashRouter, so URLs will have `#` (e.g., `/#/dashboard`)
- This is normal for GitHub Pages deployment

**Build Fails:**
- Run `yarn build` locally first
- Check for any errors in the console
- Make sure all dependencies are installed

---

## Need Backend?

The current version works with mock data. To add a real backend:

1. Deploy backend separately (Render, Railway, etc.)
2. Update frontend `.env`:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-url.com
   ```
3. Rebuild and redeploy
