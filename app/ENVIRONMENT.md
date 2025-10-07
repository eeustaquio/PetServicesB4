# Environment Variables Management

This project uses environment variables for configuration. Sensitive values should be stored in `.env.local` (not committed to version control).

## How to Use

- **Local Development:**
  - Place your variables in `app/.env.local` (already gitignored).
  - Example:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```
- **CI/CD:**
  - Set secrets in GitHub Actions (e.g., `FIREBASE_TOKEN`, `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`).
  - Use repository secrets for sensitive values.

## Best Practices
- Never commit `.env.local` or secrets to git.
- Document required variables in this file or in `README.md`.
- Use `process.env.VARIABLE_NAME` in your code to access variables.

## Required Variables
- See `.env.example` for a template of required variables.
