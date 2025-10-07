# Third-Party Integration Details

## Overview
This section documents API keys, endpoints, and test credentials for third-party services integrated with the PetServices Platform.

## Payment Gateways
- **Stripe**: https://api.stripe.com (API key in environment variable `STRIPE_API_KEY`)
- **PayMongo**: https://api.paymongo.com (API key in `PAYMONGO_API_KEY`)
- **GCash**: [Integration details TBD]

## Notifications
- **Twilio (SMS)**: https://api.twilio.com (Account SID, Auth Token in env)
- **SendGrid (Email)**: https://api.sendgrid.com (API key in env)
- **Firebase Cloud Messaging (Push)**: https://fcm.googleapis.com (Server key in env)

## Maps
- **Google Maps**: https://maps.googleapis.com (API key in env)

## AI
- **OpenAI**: https://api.openai.com (API key in env)

## Test Credentials
- Use sandbox/test keys for development and testing. Never commit real secrets.

---
## Changelog
- 2025-10-04: Populated with starter integration details for payments, notifications, maps, and AI.