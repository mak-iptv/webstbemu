# STB EMU Player - Deployment Guide

## 📦 Deploying to GitHub Pages

### Step 1: Prepare Your Repository

1. Create a new repository on GitHub
2. Initialize git in your project:
```bash
cd /app/frontend
git init
git add .
git commit -m "Initial commit: STB EMU Player"
```

### Step 2: Update package.json

Add your GitHub Pages URL to `package.json`:
```json
"homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME"
```

Or for organization:
```json
"homepage": "https://YOUR-ORG.github.io/YOUR-REPO-NAME"
```

### Step 3: Install gh-pages

```bash
cd /app/frontend
yarn add -D gh-pages
```

### Step 4: Add Deploy Scripts

Add these scripts to `package.json`:
```json
"scripts": {
  "predeploy": "yarn build",
  "deploy": "gh-pages -d build",
  "start": "craco start",
  "build": "craco build",
  "test": "craco test"
}
```

### Step 5: Deploy

```bash
# Link to your GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Deploy to GitHub Pages
yarn deploy
```

This will:
- Build your app
- Create/update `gh-pages` branch
- Deploy to GitHub Pages

### Step 6: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select branch: `gh-pages` and folder: `/ (root)`
4. Click **Save**

Your app will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME`

---

## 🚀 Alternative: Deploy to Vercel

### Quick Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Configure:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `yarn build`
   - Output Directory: `build`
6. Click "Deploy"

### Environment Variables (if using backend)

Add in Vercel dashboard:
- `REACT_APP_BACKEND_URL` = your backend API URL

---

## 🌐 Alternative: Deploy to Netlify

### Quick Deploy

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Configure:
   - Base directory: `frontend`
   - Build command: `yarn build`
   - Publish directory: `frontend/build`
6. Click "Deploy site"

### _redirects File for React Router

Create `frontend/public/_redirects`:
```
/*    /index.html   200
```

---

## 🔧 Backend Deployment (Optional)

### Deploy Backend to Render

1. Create `render.yaml` in project root:
```yaml
services:
  - type: web
    name: stb-emu-backend
    env: python
    buildCommand: cd backend && pip install -r requirements.txt
    startCommand: cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: MONGO_URL
        value: your-mongodb-connection-string
      - key: DB_NAME
        value: stb_emu
```

2. Connect to GitHub and deploy

### Update Frontend with Backend URL

Update `frontend/.env` or Vercel/Netlify environment variables:
```
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```

---

## 📝 Notes

- **Current Setup**: App uses HashRouter for GitHub Pages compatibility
- **Mock Data**: Currently using mock data from `mock.js`
- **Backend Integration**: Backend files included but need MongoDB and proper API implementation
- **CORS**: Make sure backend allows your frontend domain in CORS settings

---

## 🐛 Troubleshooting

### Blank Page After Deploy
- Check browser console for errors
- Verify `homepage` field in package.json matches your GitHub Pages URL
- Ensure you're using HashRouter (not BrowserRouter)

### 404 on Routes
- This shouldn't happen with HashRouter
- If using BrowserRouter on other platforms, add proper redirects

### Build Fails
- Run `yarn build` locally first to check for errors
- Check Node.js version compatibility
- Verify all dependencies are in package.json

### Environment Variables Not Working
- React env vars must start with `REACT_APP_`
- Rebuild after changing env vars
- Check if platform requires specific configuration (Vercel, Netlify, etc.)
