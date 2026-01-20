# Mass Mail Dispatcher (Email-X)

A small static project for sending bulk emails (client-side HTML/JS + CSV). This repository contains the UI files and a helper script to push the project to GitHub.

Contents
- `index.html` — frontend UI
- `main.js` — client-side JavaScript
- `style.css` — styles
- `BULKEMAIL2.csv` — sample/inputs for bulk email addresses
- `push-to-Email-X.ps1` — PowerShell helper script to initialize, commit, set remote and push
- `README-PUSH.md` — short instructions for running the push script

How to push this project to GitHub (Windows PowerShell)

1. Install Git for Windows if you haven't: https://git-scm.com/download/win
2. Open PowerShell and change to this project folder:

```powershell
cd "C:\Users\rajma\OneDrive\Desktop\Check (2)\Check\Mass Mail Dispatcher"
```

3. (Optional) Inspect status and branch:

```powershell
git status
git branch --show-current
```

4. Run the helper script that will initialize a repo (if needed), commit files, add the remote and push to `main`:

```powershell
.\push-to-Email-X.ps1
```

Authentication notes
- HTTPS: When prompted for a password use your GitHub Personal Access Token (PAT). Create one at https://github.com/settings/tokens (repo scope is enough).
- SSH: If you prefer SSH, add your SSH key to GitHub and edit the `$remoteUrl` variable in `push-to-Email-X.ps1` to:

```
git@github.com:Aarav290-arch/Email-X.git
```

If the remote already has different history
- If the remote repository already contains commits that conflict with your local history, the script attempts a safe `git pull --rebase`. If that fails you may need to manually resolve or merge.

Suggested next actions
- Run the push script locally after installing Git.
- If the remote uses `master` instead of `main`, either edit the script variable `$branch = 'main'` to `master`, or create the `main` branch remotely.

License & safety
- This project contains no server-side secrets. Do not commit any API keys or credentials to the repo.

Questions or help
- Paste any error output here and I will help resolve it.
