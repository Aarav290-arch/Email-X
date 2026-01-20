# Push-to-Email-X.ps1
# Usage: Open PowerShell in this folder and run: .\push-to-Email-X.ps1

# Ensure script runs from its folder
Set-Location -Path $PSScriptRoot

# Check for git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed or not in PATH. Install Git for Windows and re-run this script." -ForegroundColor Yellow
    exit 1
}

# Recommended remote URL (HTTPS). Change to SSH if you prefer.
$remoteUrl = 'https://github.com/Aarav290-arch/Email-X.git'
$branch = 'main'

# Initialize repo if needed
$inside = & git rev-parse --is-inside-work-tree 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Initializing new git repository..."
    git init
}

# Configure user.name/email if not set
$userName = (& git config user.name) -join ''
$userEmail = (& git config user.email) -join ''
if (-not $userName) {
    git config user.name "Your Name"
    Write-Host "Set git user.name to 'Your Name' (edit locally if needed)."
}
if (-not $userEmail) {
    git config user.email "you@example.com"
    Write-Host "Set git user.email to 'you@example.com' (edit locally if needed)."
}

# Stage changes
git add .

# Commit if there are changes
$status = git status --porcelain
if ($status) {
    git commit -m "Add project files"
} else {
    Write-Host "No changes to commit." -ForegroundColor Cyan
}

# Set or update remote
$existing = (& git remote get-url origin 2>$null) -join ''
if ($existing) {
    Write-Host "Updating remote 'origin' to $remoteUrl"
    git remote set-url origin $remoteUrl
} else {
    Write-Host "Adding remote 'origin' -> $remoteUrl"
    git remote add origin $remoteUrl
}

# Ensure branch name
git branch -M $branch

# Try to fetch remote (may fail if remote empty or unreachable)
Write-Host "Fetching from origin (if reachable)..."
& git fetch origin 2>$null

# Attempt safe pull -- if remote has history this will incorporate it
$pullResult = & git pull --rebase origin $branch 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "git pull failed or remote may be empty; continuing to push. Details:" -ForegroundColor Yellow
    Write-Host $pullResult
}

# Push
Write-Host "Pushing to origin/$branch..."
& git push -u origin $branch
if ($LASTEXITCODE -eq 0) {
    Write-Host "Push complete." -ForegroundColor Green
} else {
    Write-Host "Push failed. You may need to authenticate (use a PAT for HTTPS) or resolve merge conflicts." -ForegroundColor Red
}
