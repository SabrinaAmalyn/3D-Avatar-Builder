# 3D Avatar Builder: Learning Log

**Tutorial:** _(link to be added)_
**Started:** 11 Nov 2026
**Project folder:** `C:\3D Avatar Builder`
**GitHub repo:** https://github.com/SabrinaAmalyn/3D-Avatar-Builder

---

## Progress at a glance

| # | Step | Status | Date | Commit |
|---|------|--------|------|--------|
| 0 | Project folder & learning log created | ✅ Done | 11 Nov 2026 | `544c2c8` |
| 1 | Connected project to GitHub | ✅ Done | 11 Nov 2026 | `544c2c8` |

<!-- Status key: ✅ Done · 🔄 In progress · ⏸️ Stuck · ⬜ Not started -->

---

## Detailed backlog

### Step 0: Project folder & learning log created
**Date:** 11 Nov 2026
**Commit:** `544c2c8` – "Step 0: learning log"

**What I did**
- Set up `C:\3D Avatar Builder` as the project folder for the 3D avatar builder.
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
- Use `git config user.email` to check which email commits are labelled with.

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
