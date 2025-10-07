jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install
        run: npm install
      - name: Test
        run: npm test
# CI/CD Pipeline Configuration

## Overview
This section documents YAML files, deployment scripts, and pipeline steps for continuous integration and deployment (CI/CD) of the PetServices Platform.

## Example: GitHub Actions Workflow
```yaml
name: CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18.x'
      - name: Install dependencies
        run: npm install
      - name: Lint
        run: npm run lint
      - name: Test
        run: npm test
      - name: Build
        run: npm run build
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: echo "Deploy step here (e.g., Docker, cloud CLI)"
```

## Best Practices
- Use secrets for API keys and credentials
- Run tests and linting on every pull request
- Automate deployments to staging/production

---
## Changelog
- 2025-10-04: Populated with starter GitHub Actions workflow and best practices.