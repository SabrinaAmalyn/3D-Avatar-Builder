# 3D Avatar Builder: Learning Log

**Tutorial:** _(link to be added)_
**Started:** 11 Nov 2026
**Project folder (repo root):** `C:\3D Avatar Builder\3d-avatar-builder`
**GitHub repo:** https://github.com/SabrinaAmalyn/3D-Avatar-Builder

---

## Tech stack

| Tool | What it is | Role in this project |
|------|------------|----------------------|
| **Three.js** | JavaScript 3D library (WebGL) | Renders the 3D avatar in the browser: scene, camera, lights, models, materials |
| **Tailwind CSS** | Utility-first CSS framework | Styles the builder UI (panels, buttons, colour pickers, sliders) with classes directly in the markup |
| **Zustand** | Small state-management library | Holds the avatar's current settings (body, hair, outfit, colours) in one store, so the UI and the 3D scene stay in sync |
| **Vite** | Build tool + dev server | Runs the app locally with instant reload (`npm run dev`) and bundles it for production |
| **React** | UI library (came with the Vite React template) | Builds the interface out of components; Zustand plugs into it |
| **ESLint** | Linter (came with the Vite template) | Flags mistakes in the code as I type. Chose ESLint over Oxlint because it matches tutorials, has more React plugins and help online, and speed doesn't matter at this project size |
| **PocketBase** | Open-source backend in a single file (database + auth + file storage + API) | Saves and loads avatars, handles user accounts, stores uploaded assets |

**How they fit together:** UI controls (Tailwind) → update the store (Zustand) → the 3D scene (Three.js) reads the store and re-renders → Save/Load goes through PocketBase.

---

## Progress at a glance

| # | Step | Status | Date | Commit |
|---|------|--------|------|--------|
| 0 | Project folder & learning log created | ✅ Done | 11 Nov 2026 | `544c2c8` |
| 1 | Connected project to GitHub | ✅ Done | 11 Nov 2026 | `544c2c8` |
| 2 | Scaffolded project with Vite (React + npm) | ✅ Done | 11 Nov 2026 | `527f9c8` |
| 3 | Installed Tailwind CSS as a Vite plugin | ✅ Done | 11 Nov 2026 | `527f9c8` |
| 4 | Cleaned out template styling & assets | ✅ Done | 11 Nov 2026 | `527f9c8` |
| 5 | Made `3d-avatar-builder` the repo root | ✅ Done | 11 Nov 2026 | `922ba96` |

<!-- Status key: ✅ Done · 🔄 In progress · ⏸️ Stuck · ⬜ Not started -->

---

## Detailed backlog

### Step 0: Project folder & learning log created
**Date:** 11 Nov 2026
**Commit:** `544c2c8` – "Step 0: learning log"

**What I did**
- Set up `C:\3D Avatar Builder` as the project folder for the 3D avatar builder (later moved down into `3d-avatar-builder\` in Step 5).
- Added this `LEARNING_LOG.md` to track each tutorial step.

**Why**
- To give the project one home for code, assets and notes, with the log versioned alongside the code.

**Key commands / code**
_(none)_

**Problems & fixes**
- First started in `C:\MakObit`, then switched to `C:\3D Avatar Builder` as the main folder and moved the log there.

**Notes / things I learned**
_(none)_

---

### Step 1: Connected project to GitHub
**Date:** 11 Nov 2026
**Commit:** `544c2c8` (first push)

**What I did**
- Turned the folder into a Git repo and linked it to the GitHub repo `SabrinaAmalyn/3D-Avatar-Builder`.
- Made the first commit and pushed it to the `main` branch.

**Why**
- To get version control and an online backup, so every tutorial step can be saved as a commit and earlier versions can be restored.

**Key commands / code**
```
git init
git branch -M main
git remote add origin https://github.com/SabrinaAmalyn/3D-Avatar-Builder.git
git add .
git commit -m "Step 0: learning log"
git push -u origin main
```
After this one-time setup, each step is just:
```
git add .
git commit -m "Step N: <what I did>"
git push
```

**Problems & fixes**
- **Problem:** `git push` failed with `Permission ... denied to hikeysolutionsdev` / `error: 403`.
- **Cause:** Windows had a saved GitHub login for a different account (`hikeysolutionsdev`), and Git used it instead of my own account, which doesn't have access to my repo.
- **Fix:** Removed or overrode the saved login and signed in as `SabrinaAmalyn` when prompted, then pushed again.
  - Alternative fix: put the username in the remote URL so the repo always uses my account:
    `git remote set-url origin https://SabrinaAmalyn@github.com/SabrinaAmalyn/3D-Avatar-Builder.git`
  - Saved logins are in Windows **Credential Manager → Windows Credentials** (`git:https://github.com`).

**Notes / things I learned**
- `git add` → stage changes, `git commit` → save a snapshot locally, `git push` → upload to GitHub.
- `-u origin main` on the first push sets the default, so later pushes need only `git push`.
- Error 403 means "you're logged in, but this account isn't allowed here." It's a wrong-account problem, not a wrong-password problem.
- `git add .` only adds changes in the **current folder and below**. Running it inside the old `3d-avatar-builder/` subfolder skipped `LEARNING_LOG.md` in the repo root. Use `git add -A` (adds everything in the repo from anywhere), or run `git add .` from the repo root. (Since Step 5 the app folder *is* the repo root, so this can't happen the same way.)
- Use `git config user.email` to check which email commits are labelled with.

---

### Step 2: Scaffolded project with Vite (React + npm)
**Date:** 11 Nov 2026
**Commit:** `527f9c8` – "Steps 2-4: Vite + React, Tailwind, clean slate"

**What I did**
- Created a new Vite project using npm, with the React (JavaScript) template.
- Vite created the app in a new subfolder, `3d-avatar-builder/` (in Step 5 I made this folder the repo root).
- Installed dependencies with npm.

**Why**
- Vite provides a fast dev server with instant reload and a production build step, so I don't have to configure a bundler myself.
- The React template gives a working starter app plus ESLint already set up.

**Key commands / code**
```
npm create vite@latest      # chose: name 3d-avatar-builder → React → JavaScript
cd 3d-avatar-builder
npm install
npm run dev                 # start the dev server (usually http://localhost:5173)
```
What the template created:
- `index.html`: the page the app loads into
- `src/main.jsx`: entry point that mounts React
- `src/App.jsx` / `src/App.css`: the starter component (counter demo)
- `src/index.css`: global styles
- `vite.config.js`: Vite settings and plugins
- `eslint.config.js`: lint rules (ESLint 10 + React hooks plugins)
- `.gitignore`: already ignores `node_modules`

Versions installed: Vite 8.3, React 19.3, ESLint 10.14.

**Problems & fixes**
_(none)_

**Notes / things I learned**
- `npm run lint` runs ESLint over the project.
- `node_modules/` is never committed; anyone can recreate it from `package.json` + `package-lock.json` with `npm install`.
- Run npm commands from the folder that has `package.json`: `C:\3D Avatar Builder\3d-avatar-builder`.

---

### Step 3: Installed Tailwind CSS as a Vite plugin
**Date:** 11 Nov 2026
**Commit:** `527f9c8` – "Steps 2-4: Vite + React, Tailwind, clean slate"

**What I did**
- Installed Tailwind CSS and its official Vite plugin with npm.
- Added the plugin to `vite.config.js`.
- Imported Tailwind at the top of `src/index.css`.

**Why**
- Tailwind v4 integrates directly with Vite through `@tailwindcss/vite`, with no `tailwind.config.js` or PostCSS setup needed.
- The `@import` pulls Tailwind's styles in, so I can use utility classes (`flex`, `p-4`, `bg-slate-800`, ...) in any component.

**Key commands / code**
```
npm install tailwindcss @tailwindcss/vite
```
`vite.config.js`:
```js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```
`src/index.css` (first line):
```css
@import "tailwindcss";
```

Version installed: Tailwind CSS 4.3.

**Problems & fixes**
_(none)_

**Notes / things I learned**
- Tailwind v4 needs only the plugin + one CSS import. Older tutorials (v3) use `tailwind.config.js`, `npx tailwindcss init` and `@tailwind base/components/utilities`, which isn't needed anymore.
- To test it, add a class like `className="text-3xl font-bold underline"` to something in `App.jsx` and check that it changes in the browser.
- The template's own CSS could clash with Tailwind styles, so I removed it in Step 4.

---

### Step 4: Cleaned out template styling & assets
**Date:** 11 Nov 2026
**Commit:** `527f9c8` – "Steps 2-4: Vite + React, Tailwind, clean slate"

**What I did**
- Deleted the template images in `src/assets/` (`hero.png`, `react.svg`, `vite.svg`), and with them the `assets` folder.
- Deleted `src/App.css` and its import from `App.jsx`.
- Stripped `src/index.css` down to the single line `@import "tailwindcss";` (removed the template's `:root` colour variables and other styles).
- Replaced the counter demo in `App.jsx` with a simple Tailwind test heading.

**Why**
- To start from a blank slate, so the only styling comes from Tailwind and nothing from the template interferes with it.
- The starter images and counter demo aren't part of the avatar builder.

**Key commands / code**
`src/index.css` (whole file):
```css
@import "tailwindcss";
```
`src/App.jsx`:
```jsx
function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </>
  )
}

export default App
```
Files left in `src/`: `main.jsx`, `App.jsx`, `index.css`.

**Problems & fixes**
- Used `class=` instead of `className=` on the `<h1>`. In JSX it has to be `className`, because `class` is a reserved word in JavaScript. React may still apply it but logs a warning in the browser console.

**Notes / things I learned**
- `main.jsx` imports `index.css`, so Tailwind loads globally for every component.
- `public/` (favicon.svg, icons.svg) is separate from `src/assets/`. Files in `public/` are served as-is at the site root (e.g. `/favicon.svg`), so the favicon still works.
- Tailwind's base styles ("Preflight") reset default browser styling. That's why plain `<h1>` text looks unstyled unless I add classes like `text-3xl`.

---

### Step 5: Made `3d-avatar-builder` the repo root
**Date:** 11 Nov 2026
**Commit:** `922ba96` – "Make 3d-avatar-builder the repo root"

**What I did**
- Moved the hidden `.git` folder and `LEARNING_LOG.md` from `C:\3D Avatar Builder` down into `C:\3D Avatar Builder\3d-avatar-builder`.
- Committed and pushed, so on GitHub `package.json`, `src/` etc. now sit at the top level of the repo instead of inside a `3d-avatar-builder/` folder.

**Why**
- Vite scaffolded the app into a subfolder, so the repo had an extra folder level. Having the app folder as the repo root is the standard layout: one folder for git, npm and VS Code, and hosting services (Vercel, Netlify, etc.) find `package.json` without extra config.

**Key commands / code**
```
# stop dev server & close VS Code first
cd "C:\3D Avatar Builder"
Move-Item -Force .git 3d-avatar-builder\
Move-Item LEARNING_LOG.md 3d-avatar-builder\
cd 3d-avatar-builder
git add -A
git status        # files show as "renamed", not deleted + new
git commit -m "Make 3d-avatar-builder the repo root"
git push
```

**Problems & fixes**
- This came out of Step 4's push problem: running `git add .` inside the subfolder had skipped the learning log in the parent folder. This change fixes the cause.

**Notes / things I learned**
- A folder is a git repo because it contains `.git`. Moving `.git` changes which folder is the repo root.
- Git notices when files have been moved and records them as **renames**, so the history of every file is kept (`git log --follow <file>` shows it across the move).
- `-Force` is needed in PowerShell because `.git` is a hidden folder.
- From now on, open `C:\3D Avatar Builder\3d-avatar-builder` in VS Code and run all git + npm commands there.

---

<!--
Template for new entries (Claude fills these in from your updates):

### Step N: <title>
**Date:** 
**Commit:** 

**What I did**
- 

**Why**
- 

**Key commands / code**
```
```

**Problems & fixes**
- 

**Notes / things I learned**
- 
-->
