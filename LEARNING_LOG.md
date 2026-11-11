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
| **React Three Fiber** (`@react-three/fiber`) | React renderer for Three.js | Lets me write the 3D scene as React components (`<Canvas>`, `<mesh>`, ...) instead of plain Three.js code |
| **Drei** (`@react-three/drei`) | Helper library for React Three Fiber | Ready-made pieces: camera controls, model loading, lighting environments, etc. |
| **Tailwind CSS** | Utility-first CSS framework | Styles the builder UI (panels, buttons, colour pickers, sliders) with classes directly in the markup |
| **Zustand** | Small state-management library (v5) | Holds the avatar's current settings (body, hair, outfit, colours) in one store, so the UI and the 3D scene stay in sync |
| **Vite** | Build tool + dev server | Runs the app locally with instant reload (`npm run dev`) and bundles it for production |
| **React** | UI library (came with the Vite React template) | Builds the interface out of components; Zustand plugs into it |
| **ESLint** | Linter (came with the Vite template) | Flags mistakes in the code as I type. Chose ESLint over Oxlint because it matches tutorials, has more React plugins and help online, and speed doesn't matter at this project size |
| **PocketBase** | Open-source backend in a single file (database + auth + file storage + API). JS SDK: `pocketbase` npm package | Saves and loads avatars, handles user accounts, stores uploaded assets. Runs locally at `http://127.0.0.1:8090` for now |

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
| 6 | Installed Three.js, React Three Fiber & Drei | ✅ Done | 11 Nov 2026 | `94224c4` |
| 7 | First 3D scene: a box with orbit controls | ✅ Done | 11 Nov 2026 | `df30803` |
| 8 | Set up PocketBase locally (skipped paid hosting) | ✅ Done | 11 Nov 2026 | – (lives outside the repo) |
| 9 | Created PocketBase collections for customization | ✅ Done | 11 Nov 2026 | – (data lives in `pb_data`) |
| 10 | Zustand store + UI menu loading categories from PocketBase | ✅ Done | 11 Nov 2026 | _(this push)_ |

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

### Step 6: Installed Three.js, React Three Fiber & Drei
**Date:** 11 Nov 2026
**Commit:** `94224c4` – "Step 6: Three.js, R3F, Drei"

**What I did**
- Installed the 3D libraries with npm:
  - `three`: the Three.js core 3D engine
  - `@types/three`: type definitions for Three.js
  - `@react-three/fiber`: lets React drive Three.js
  - `@react-three/drei`: helper components for React Three Fiber

**Why**
- Three.js on its own is written imperatively (create scene, camera, renderer, add objects, run an animation loop by hand). React Three Fiber (R3F) lets me describe the same scene as React components, so it works naturally with React state and Zustand.
- Drei saves writing common pieces by hand, e.g. `<OrbitControls />` to rotate around the avatar and `useGLTF` to load 3D models.
- `@types/three` gives VS Code autocomplete and hover docs for Three.js, even in a JavaScript project.

**Key commands / code**
```
npm install three @types/three @react-three/fiber
npm install @react-three/drei
```
Versions installed: three 0.187, @react-three/fiber 9.8, @react-three/drei 10.7.

Rough idea of what R3F code looks like (to come in later steps):
```jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

<Canvas>
  <ambientLight />
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="hotpink" />
  </mesh>
  <OrbitControls />
</Canvas>
```

**Problems & fixes**
_(none)_

**Notes / things I learned**
- Three.js version numbers are `0.x` (e.g. 0.187) on purpose. It has never had a "1.0", and each minor version can include breaking changes, so tutorials from much older versions might not match exactly.
- R3F v9 is the version made for React 19. The version has to match the React version.
- `@types/*` packages are only used by the editor and type-checker, so they're often installed as dev dependencies (`npm install -D @types/three`). Having it under `dependencies` works fine too.
- Every `<mesh>` = geometry (the shape) + material (the surface look).

---

### Step 7: First 3D scene: a box with orbit controls
**Date:** 11 Nov 2026
**Commit:** `df30803` – "Step 7: first 3D scene (box + orbit controls)"

**What I did**
- Made `#root` fill the whole window so the 3D canvas has room to draw.
- Added a React Three Fiber `<Canvas>` to `App.jsx` with a camera, dark grey background, orbit controls and a small box.
- Ended up using `meshNormalMaterial` (like the tutorial), so each side of the box is a different colour and no lights are needed.

**Why**
- This is the "hello world" of 3D: it proves Three.js, R3F and Drei are wired up before building the actual avatar.

**Key commands / code**
`src/index.css`:
```css
@import "tailwindcss";

#root {
    width: 100vw;
    height: 100vh;
}

body {
    margin: 0;
}
```
`src/App.jsx`:
```jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function App() {
  return (
    <>
      <Canvas camera={{ position: [3, 3, 3] }}>
        <color attach="background" args={['#333333']} />
        <OrbitControls />
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </>
  )
}

export default App
```
What each piece does:
- `<Canvas camera={{ position: [3, 3, 3] }}>`: the 3D viewport. The camera sits at x=3, y=3, z=3 and looks at the centre (0, 0, 0).
- `<color attach="background" args={['#333333']} />`: sets the scene's background colour.
- `<OrbitControls />` (Drei): drag to rotate, scroll to zoom, right-drag to pan.
- `<mesh>`: a visible object = geometry (`boxGeometry`, 0.5 × 0.5 × 0.5) + material (`meshNormalMaterial`, unlit).

**Problems & fixes**
1. **Blank page.** **Cause:** forgot to import `Canvas` and `OrbitControls`, so React crashed with `Canvas is not defined`. **Fix:** added the two `import` lines. *Lesson: if the page is blank, check the browser console (F12 → Console) first.*
2. **Box was black / invisible.** **Cause:** `meshStandardMaterial` is a *lit* material, and the scene had no lights. **Fix:** added `<ambientLight intensity={0.5} />` + `<directionalLight position={[3, 5, 2]} intensity={1} />`, which worked (later swapped to an unlit material, see #3).
3. **The tutorial shows a box with a different colour on each side and no lights.** **Reason:** the tutorial uses `<meshNormalMaterial />`, not `meshStandardMaterial`. **Fix:** switched to `meshNormalMaterial` and removed the lights. (See notes below.)

**Notes / things I learned**
- Materials are either **lit** (`meshStandardMaterial`, `meshPhysicalMaterial`, `meshLambertMaterial`: they need lights and are black without them) or **unlit** (`meshBasicMaterial`, `meshNormalMaterial`: they show up with no lights).
- `meshNormalMaterial` colours each surface by the direction it faces (its *normal*): facing x → reddish, facing y → greenish, facing z → bluish. That's why each side of the cube is a different colour. It's a debugging/demo material, handy for checking a shape is there and the right way round.
- `ambientLight` = even light everywhere, no shadows or shading. `directionalLight` = sunlight from one direction, which gives faces different brightness so the shape reads as 3D.
- The canvas fills its parent element, so the parent (`#root`) needs a real height, or the canvas will be 0px tall.

---

### Step 8: Set up PocketBase locally (skipped paid hosting)
**Date:** 11 Nov 2026
**Commit:** – (PocketBase lives outside the repo, so nothing to commit)

**What I did**
- **Decision:** the tutorial deploys PocketBase on **Elestio** (Docker Compose + PocketBase template → new VM → CI/CD pipeline). Elestio is only free for 3 days and then needs a card, so I skipped it and run PocketBase **on my laptop** instead.
- Downloaded the Windows build of PocketBase from pocketbase.io and unzipped it.
- Put `pocketbase.exe` in its own folder, **outside** the git repo:
  ```
  C:\3D Avatar Builder\
  ├── 3d-avatar-builder\   ← git repo (React app)
  └── pocketbase\          ← backend, NOT in git
      ├── pocketbase.exe
      └── pb_data\         ← created on first run: database + uploaded files
  ```
- Started it, created the **superuser** (admin) account, and logged in to the admin dashboard.

**Why**
- My earlier HTML/CSS sites were just **files**, so free static hosting could serve them. PocketBase is a **program that must keep running** (database, logins, save/load requests), so putting it online means renting a server that's on 24/7, which costs money.
- For learning and building, running it locally gives every feature for free. The only difference is that it's reachable only from my own laptop.

**Key commands / code**
```
cd "C:\3D Avatar Builder\pocketbase"
.\pocketbase.exe serve
```
- Admin dashboard: http://127.0.0.1:8090/_/
- API (what the React app will call): http://127.0.0.1:8090
- PocketBase must be **running** (terminal left open) whenever I use the app. `Ctrl + C` stops it.
- Day-to-day I'll need **two terminals**: one running `npm run dev` (React app, port 5173) and one running `pocketbase.exe serve` (backend, port 8090).

**Problems & fixes**
- **Problem:** the tutorial's hosting (Elestio) costs money after a 3-day trial. **Fix:** run PocketBase locally and look at hosting later.

**Notes / things I learned: deployment terms explained**
| Term | Simple meaning |
|---|---|
| **Elestio** | A company that rents out servers with open-source apps (like PocketBase) pre-installed. You pay so you don't have to set up the server yourself. |
| **Docker** | Packs an app and everything it needs into a sealed "box" (a *container*) that runs the same on any computer. |
| **Docker Compose** | A recipe file (`docker-compose.yml`) listing which containers to start and how they connect, e.g. "run PocketBase, keep its data in this folder, open port 8090". |
| **Template** | A ready-made recipe. Choosing "PocketBase" means the Docker Compose file is already written. |
| **VM (Virtual Machine)** | A rented computer in a data centre: a slice of a big server that acts like its own machine. |
| **Cloud provider** | The company that owns the data centre (AWS, Google Cloud, Hetzner, DigitalOcean, ...). |
| **Region** | Where in the world the server physically is. Closer to users = faster. |
| **Service plan** | How powerful (and expensive) the rented computer is: CPU, RAM, storage. |
| **CI/CD target instance** | The specific server the app gets delivered to ("target" = destination). |
| **Project** | A folder in the hosting account for grouping related servers. |
| **CI/CD pipeline** | Automatic delivery: on every `git push`, it builds and updates the live server. **CI** = Continuous Integration (build/test automatically), **CD** = Continuous Deployment (put it live automatically). |

Other notes:
- **Superuser** = PocketBase's admin account for the dashboard. It's separate from the normal *users* who will sign up in the avatar builder.
- `pb_data/` **is** the database. Don't delete it, and back it up by copying the folder (with PocketBase stopped).
- `127.0.0.1` = "this computer" (same as `localhost`). Nobody else can reach it.
- **Later, to put it online:** managed PocketBase hosts (PocketBase Cloud, PocketHost) or a cheap VPS (~$5–10/month). Free tiers change often, so check current pricing first.

---

### Step 9: Created PocketBase collections for customization
**Date:** 11 Nov 2026
**Commit:** – (collections and records live in `pocketbase/pb_data`, not in the repo)

**What I did**
In the PocketBase admin dashboard (http://127.0.0.1:8090/_/), created two new collections next to the built-in `users` collection:

**1. `CustomizationGroups`**: the categories shown in the builder

| Field | Type | Notes |
|---|---|---|
| `id` | auto | Every collection has it |
| `name` | text | e.g. "Hair" |
| `position` | number | Display order in the UI |
| `created` / `updated` | autodate | Every collection has them |

13 records:

| position | name | | position | name |
|---|---|---|---|---|
| 1 | Head | | 8 | Glasses |
| 2 | Hair | | 9 | Hat |
| 3 | Face | | 10 | Top |
| 4 | Eyes | | 11 | Bottom |
| 5 | Eyebrows | | 12 | Shoe |
| 6 | Nose | | 13 | Accessories |
| 7 | Facial Hair | | | |

**2. `CustomizationAssets`**: the individual items you can pick in each category

| Field | Type | Notes |
|---|---|---|
| `id` | auto | |
| `group` | relation → `CustomizationGroups` (single) | Which category the item belongs to |
| `name` | text | e.g. "Top_01" |
| `thumbnail` | file | Small preview image shown in the picker |
| `url` | file | The 3D model file for the item (empty for now) |
| `created` / `updated` | autodate | |

3 records so far: `Top_01`, `Top_02`, `Top_03`, all with `group` = **Top**, each with a thumbnail image, and `url` empty for now.

**Why**
- Keeping the options in the database (not hard-coded in React) means I can add new hats, tops etc. from the dashboard without changing any code. The app just loads whatever is there.
- `position` lets me control the order of categories in the UI instead of relying on alphabetical or creation order.
- The **relation** links each asset to its group, so the app can ask "give me all assets where group = Top".

**Key commands / code**
_(done in the dashboard, no code yet)_

How the React app will fetch this later (using the PocketBase JS SDK):
```js
import PocketBase from 'pocketbase'
const pb = new PocketBase('http://127.0.0.1:8090')

// all groups in display order, each with its assets attached
const groups = await pb.collection('CustomizationGroups').getFullList({ sort: '+position' })
const assets = await pb.collection('CustomizationAssets').getFullList({ expand: 'group' })
```

**Problems & fixes**
_(none)_

**Notes / things I learned**
- **Collection** = a table. **Record** = a row. **Field** = a column.
- **Relation field** = stores another record's `id` (here, the group's id) instead of copying its data. `expand: 'group'` in a query pulls in the full linked record.
- **File fields** store just the *filename* in the database (e.g. `top_jb88u2ivdn.jpg`). PocketBase adds a random suffix to avoid clashes. The actual file is saved in `pb_data/storage/`, and the URL to load it is built like:
  `http://127.0.0.1:8090/api/files/<collection>/<recordId>/<filename>` (or `pb.files.getURL(record, record.thumbnail)` with the SDK).
- **Default file size limit is 5 MB.** 3D models (`.glb`) can be bigger, so if an upload to `url` fails, raise **Max file size** in the field's options.
- **API rules:** new collections are admin-only by default. Before the React app can read them, the **List/View rules** need to be opened up (e.g. set to empty = public) in each collection's API Rules tab.
- The `users` collection is an *auth* collection, built in for sign-up and login.

---

### Step 10: Zustand store + UI menu loading categories from PocketBase
**Date:** 11 Nov 2026
**Commit:** _(this push)_

**What I did**
- Installed Zustand (state management) and the PocketBase JavaScript SDK:
  ```
  npm install zustand pocketbase
  ```
- Created `.env.local` with the PocketBase address (git-ignored by the `*.local` rule, so it never goes to GitHub):
  ```
  VITE_POCKETBASE_URL=http://127.0.0.1:8090
  ```
- Created `src/store.js`: a Zustand store that fetches the groups and assets from PocketBase and remembers which category is selected.
- Created `src/components/UI.jsx`: an overlay on top of the 3D canvas with a **Download** button (top right) and a menu box (bottom) showing the category tabs and the thumbnails for the selected category.
- Added `<UI />` to `App.jsx` above the `<Canvas>`.
- Deleted the unused `public/favicon.svg` and `public/icons.svg`, and removed the favicon link from `index.html`.

**Why**
- **Zustand** gives one shared place (the *store*) for data that several components need, like the category list and which tab is selected, without passing props down through every component.
- **The PocketBase SDK** is a ready-made client, so `pb.collection('X').getFullList()` replaces writing `fetch()` calls by hand.
- **`.env.local`** keeps settings like the server address out of the code, so it can point to a different server later (e.g. a hosted PocketBase) without editing any files.

**Key commands / code**
`src/store.js`:
```js
import { create } from 'zustand'
import PocketBase from 'pocketbase';

const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL;
if (!pocketBaseUrl) {
    throw new Error('VITE_POCKETBASE_URL is not defined in the environment variables.');
}
export const pb = new PocketBase(pocketBaseUrl);
pb.autoCancellation(false);

export const useConfiguratorStore = create((set) => ({
    categories: [],
    currentCategory: null,
    assets: [],
    fetchCategories: async () => {
        try {
            const categories = await pb.collection('CustomizationGroups').getFullList({ sort: '+position' });
            const assets = await pb.collection('CustomizationAssets').getFullList({ sort: '-created' });
            categories.forEach(category => {
                category.assets = assets.filter((asset) => asset.group === category.id);
            });
            set({ categories, currentCategory: categories[0], assets });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    },
    setCurrentCategory: (category) => set({ currentCategory: category }),
}))
```
How it flows:
1. `AssetsBox` mounts → `useEffect` calls `fetchCategories()`.
2. The store loads all groups (sorted by `position`) and all assets, then attaches each group's assets to it (`category.assets`).
3. `set(...)` saves them in the store, and every component reading the store re-renders.
4. Clicking a tab → `setCurrentCategory(category)` → that tab turns indigo and its thumbnails show.
5. Thumbnail image URL: `pb.files.getURL(asset, asset.thumbnail)`.

`src/components/UI.jsx` layout:
```
<main>  fixed, covers the screen, pointer-events-none (clicks pass through to the 3D canvas)
 ├─ top row:    [ empty <a> placeholder ]            [ Download button ]
 └─ bottom:     AssetsBox
                 ├─ category tabs  (Head, Hair, ... Accessories)
                 └─ thumbnails for the selected category
```

**Problems & fixes**
1. **`Failed to resolve import "../store/configuratorStore"`**. **Cause:** the import path didn't match the real file (`src/store.js`). **Fix:** changed the import to `"../store"`. *Lesson: `../` means "go up one folder", and the path must match the actual file location and name.*
2. **`pocketbase` package missing.** The store imported it, but it was never installed. **Fix:** `npm install pocketbase`.
3. **Selected tab never highlighted.** **Cause:** `setCurrentCategory(category.id)` stored just the id (a string), but the highlight checked `currentCategory.name`. **Fix:** pass the whole object: `setCurrentCategory(category)`.
4. **"The request was autocancelled" error in dev.** **Cause:** React `<StrictMode>` runs effects twice in development, and the PocketBase SDK cancels a duplicate identical request. **Fix:** `pb.autoCancellation(false)`.
5. **Errors were silent.** **Fix:** wrapped the fetch in `try/catch` with a clear `console.error`.
6. **Two PocketBase clients** (one in `UI.jsx`, one in `store.js`). **Fix:** `export const pb` from the store and import it in `UI.jsx`.
7. **`max-w-screen-xl` did nothing.** That class doesn't exist in Tailwind v4. **Fix:** `max-w-7xl` (same 1280px).
8. **Thumbnails not fitting their boxes.** **Fix:** `className="w-full h-full object-cover"` + `alt` text on the `<img>`.
9. **`pb.files.getUrl` deprecated** (console warning). **Fix:** `pb.files.getURL` (capital URL).
10. **Small cleanups:** `key={asset.id}` instead of the array index, removed invalid Tailwind classes (`transition-opacity-100`), added `fetchCategories` to the `useEffect` dependency array, removed the dead favicon link.

**Notes / things I learned**
- **Vite env variables** must start with `VITE_` to be available in browser code, and they're read with `import.meta.env.VITE_...`. After creating or changing `.env.local`, **restart** `npm run dev`.
- **`.env.local` is not on GitHub.** On a new computer I have to create it again.
- **`pointer-events-none` on the overlay + `pointer-events-auto` on buttons** = the menu is clickable, but dragging anywhere else still rotates the 3D view.
- **React keys** should be stable, unique ids (`asset.id`), not the array index, so React can track items correctly when the list changes.
- **StrictMode double-running effects** only happens in development. It's React deliberately checking for bugs, and doesn't happen in the production build.
- Calling `useConfiguratorStore()` with no selector re-renders on *any* store change. That's fine for now; later I can select just what's needed: `useConfiguratorStore((s) => s.categories)`.
- Both PocketBase (`pocketbase.exe serve`) **and** the dev server (`npm run dev`) must be running, or the menu stays empty.

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
