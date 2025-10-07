# Environment Configuration

## Overview
This section describes environment variables, secrets management, and provides a `.env.example` template for the PetServices Platform.

## .env.example
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://user:pass@host:port/db
JWT_SECRET=your-jwt-secret
STRIPE_API_KEY=your-stripe-key
SENDGRID_API_KEY=your-sendgrid-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
GOOGLE_MAPS_API_KEY=your-google-maps-key
OPENAI_API_KEY=your-openai-key
```

## Secrets Management
- Store secrets in environment variables, not in code or version control.
- Use a secrets manager (e.g., AWS Secrets Manager, Azure Key Vault) for production.
- Share `.env.example` (not real `.env`) with developers.

---
## Changelog
- 2025-10-04: Populated with starter environment variable template and best practices.