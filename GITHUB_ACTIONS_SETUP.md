# GitHub Actions Setup Guide

## Prerequisites

1. GitHub account
2. GitHub repository
3. Docker Hub account
4. Docker Hub access token

## Step 1: Generate Docker Hub Token

1. Log in to [Docker Hub](https://hub.docker.com)
2. Click your profile icon → **Account Settings**
3. Go to **Security**
4. Click **New Access Token**
5. Enter token name (e.g., `github-actions`)
6. Select **Read & Write** permissions
7. Click **Generate**
8. Copy the token (you won't see it again)

## Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings**
3. Go to **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add the following secrets:

### Secret 1: DOCKERHUB_USERNAME
- **Name:** `DOCKERHUB_USERNAME`
- **Value:** Your Docker Hub username

### Secret 2: DOCKERHUB_TOKEN
- **Name:** `DOCKERHUB_TOKEN`
- **Value:** The token you generated (paste without spaces)

**Important:** Never share these secrets! They are sensitive credentials.

## Step 3: Verify Workflow Files

Ensure these files exist:
- `.github/workflows/ci.yml` - Continuous Integration
- `.github/workflows/cd.yml` - Continuous Deployment

## Step 4: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit with Docker & CI/CD setup"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

## Step 5: Monitor CI Pipeline

1. Push code to a feature branch:
   ```bash
   git checkout -b feature/my-feature
   git add .
   git commit -m "My changes"
   git push origin feature/my-feature
   ```

2. Create a Pull Request to `main` or `develop`

3. Go to **Actions** tab in your repository

4. You should see **CI Pipeline** running:
   - Frontend tests and build
   - Backend tests

## Step 6: Trigger CD Pipeline

1. Merge PR to `main` branch

2. Go to **Actions** tab

3. You should see **CD Pipeline** running:
   - Docker image build for frontend
   - Docker image build for backend
   - Push to Docker Hub

## Step 7: Verify Images in Docker Hub

1. Log in to Docker Hub
2. Go to **Repositories**
3. You should see:
   - `your-username/frontend-app:latest`
   - `your-username/backend-app:latest`

## Workflow Triggers

### CI Pipeline (ci.yml)
Triggers on:
- Push to `main` or `develop`
- Pull requests to `main` or `develop`

### CD Pipeline (cd.yml)
Triggers on:
- Push to `main` only

## Environment Variables in Workflows

### Access Secrets
```yaml
- name: Use Secret
  env:
    DOCKERHUB_USERNAME: ${{ secrets.DOCKERHUB_USERNAME }}
    DOCKERHUB_TOKEN: ${{ secrets.DOCKERHUB_TOKEN }}
  run: echo "Using secrets"
```

### Set Environment Variables
```yaml
env:
  NODE_VERSION: 20

- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: ${{ env.NODE_VERSION }}
```

## Common Workflow Configurations

### Run Tests on Multiple Node Versions

```yaml
strategy:
  matrix:
    node-version: [18, 20, 22]

steps:
  - uses: actions/setup-node@v4
    with:
      node-version: ${{ matrix.node-version }}
```

### Run Only on Changes to Specific Files

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'client/**'
      - '.github/workflows/ci.yml'
```

### Schedule Workflows

```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Run at 2 AM daily
```

## Troubleshooting Workflows

### Check Workflow Syntax
GitHub automatically validates YAML syntax. If there are errors, you'll see them in the Actions tab.

### View Detailed Logs
1. Go to **Actions** tab
2. Click the workflow run
3. Click the job to expand logs
4. Click individual steps to see detailed output

### Common Issues

**Issue:** `DOCKERHUB_TOKEN not found`
- **Solution:** Check that secrets are added to repository settings
- Verify secret names are correct

**Issue:** `Docker image push failed`
- **Solution:** Check Docker Hub credentials in secrets
- Ensure token has write permissions
- Check internet connection in Actions runner

**Issue:** `Node dependencies not found`
- **Solution:** Check `package.json` exists
- Verify `npm ci` or `npm install` runs before tests

**Issue:** `Port already in use during tests`
- **Solution:** Use different ports in test configuration
- Ensure tests are isolated

## Best Practices

1. **Use `npm ci` instead of `npm install`** in CI
   - More reliable in CI environments
   - Respects exact versions in package-lock.json

2. **Cache dependencies**
   ```yaml
   - uses: actions/setup-node@v4
     with:
       node-version: 20
       cache: npm
       cache-dependency-path: client/package-lock.json
   ```

3. **Use specific action versions**
   ```yaml
   uses: actions/checkout@v4  # Specific version, not @main
   ```

4. **Add descriptive step names**
   ```yaml
   - name: Build frontend Docker image
     run: docker build -t my-image ./client
   ```

5. **Keep secrets secure**
   - Never hardcode secrets in workflows
   - Use `${{ secrets.SECRET_NAME }}`
   - Rotate tokens regularly

## Monitoring & Notifications

### Email Notifications
- GitHub sends email notifications by default
- Customize in **Actions notification preferences**

### Slack Integration
```yaml
- name: Send Slack notification
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

### Status Badge
Add to README.md:
```markdown
![CI/CD Pipeline](https://github.com/your-username/your-repo/actions/workflows/ci.yml/badge.svg)
```

## Next Steps

1. Configure deployment to cloud platforms (AWS, GCP, Azure, Heroku)
2. Add code coverage reporting
3. Add security scanning
4. Set up automatic releases
5. Configure environment-specific deployments
