# How to Deploy This Website

This folder contains a fully built, production-ready website. You have several easy options to deploy it for free.

## Option 1: Netlify Drop (Easiest)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the **entire `Kimi_Agent_Deployment_v4` folder** onto the page.
3. Done! Netlify will give you a live URL instantly.

## Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel` (if you have Node.js installed).
2. Run `vercel` inside this folder.
3. Follow the prompts. The `vercel.json` file handles configuration automatically.

## Option 3: GitHub Pages
1. Create a new repository on GitHub.
2. Push this folder to the repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
3. Go to Repository Settings -> Pages.
4. Set source to `main` branch and save.

## Notes
- I added a `_redirects` file for Netlify to handle client-side routing.
- I added a `vercel.json` file for Vercel to handle client-side routing.
