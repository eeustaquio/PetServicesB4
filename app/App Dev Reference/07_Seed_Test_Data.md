# Seed/Test Data

## Overview
This section provides example data and scripts for seeding and testing the PetServices Platform database.

## Example Data
```json
[
  { "id": 1, "name": "Test User", "role": "customer", "email": "test1@example.com" },
  { "id": 2, "name": "Test Provider", "role": "provider", "email": "provider1@example.com" },
  { "id": 3, "name": "Test Admin", "role": "admin", "email": "admin@example.com" }
]
```

## Scripts
- `seed.js` or `seed.sql` for populating the database with test users, services, and bookings
- Use separate scripts for development and production

## Best Practices
- Never use real customer data in test environments
- Reset test data regularly

---
## Changelog
- 2025-10-04: Populated with starter test data and script guidance.