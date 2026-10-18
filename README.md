# Favourite Student List

A React app for browsing a student directory and keeping a personal favourites list. It uses React Router for page navigation and React Context to share favourites across pages.

## Live site

GitHub Actions builds and deploys the app whenever changes are pushed to `main`. Once deployment succeeds, the app is available at:

https://varshaselvaraj31-cloud.github.io/student-list-project/

## Deploy with Vercel

Import `varshaselvaraj31-cloud/student-list-project` into Vercel. The Vite framework preset uses `npm run build` and `dist` by default. The included `vercel.json` rewrites app routes so refreshing `/favourites` works. Vercel builds at the domain root; the GitHub Pages base path is configured separately in its workflow.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser. Use `Ctrl+C` in the terminal to stop the development server.

## App features

- Browse the student directory at `/`.
- Add students to favourites without creating duplicates.
- Review and remove saved students at `/favourites`.
- Navigate between pages without reloading the browser.
- Favourites are held in memory and reset when the page is refreshed.

## Project structure

- `src/App.jsx` contains the routed pages and student cards.
- `src/StudentContext.jsx` stores and updates favourites with React Context.
- `src/App.css` and `src/index.css` contain the app styling.
- `index.html` contains the browser tab title and page metadata.
