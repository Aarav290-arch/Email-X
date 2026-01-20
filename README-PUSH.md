Push local project to https://github.com/Aarav290-arch/Email-X

1) Install Git for Windows: https://git-scm.com/download/win
2) Open PowerShell, navigate to this folder, and run:

   .\push-to-Email-X.ps1

3) If using HTTPS, when prompted provide your GitHub username and Personal Access Token (PAT) as the password.
4) If you prefer SSH, add your key to GitHub and edit `push-to-Email-X.ps1` to use the SSH URL `git@github.com:Aarav290-arch/Email-X.git`.

Notes:
- This script will initialize a repo if none exists, create a commit (if files changed), add/update the remote `origin`, and attempt to push to the `main` branch.
- The script does not force-push. If the remote has unrelated history, you'll need to reconcile manually.
