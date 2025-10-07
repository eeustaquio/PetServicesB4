# Required Configurations & Environment Variables

This file lists all required configuration items, environment variables, and keys for the PetServices platform.

## Database
- `DATABASE_URL` (PostgreSQL or MongoDB connection string)

## Authentication
- `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET` (if using Auth0)
- `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, etc. (if using Firebase Auth)
- `JWT_SECRET` (for custom JWT-based auth)

## Payment Gateways
- `PAYMONGO_API_KEY`
- `DRAGONPAY_API_KEY`
- `GCASH_API_KEY`
- `MAYA_API_KEY`
- `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`
- `STRIPE_API_KEY`

## Notification Services
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`
- `SENDGRID_API_KEY`
- `FCM_SERVER_KEY` (Firebase Cloud Messaging)

## Maps & Location
- `GOOGLE_MAPS_API_KEY`
- `MAPBOX_API_KEY`

## AI & Other APIs
- `OPENAI_API_KEY`
- `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET`

## Analytics
- `GOOGLE_ANALYTICS_ID`
- `MIXPANEL_TOKEN`

## Other
- `NODE_ENV`, `PORT`
- Any additional keys required by third-party services

---

**Changelog**
- 2025-10-06: Initial configuration list created based on SolutionPlanAndFeatures.md and feature documentation.
