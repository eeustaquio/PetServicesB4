# API Request/Response Schema Examples

## Overview
This section documents example payloads, error handling, and versioning for key RESTful APIs in the PetServices Platform. All endpoints are secured and follow best practices for input validation and error reporting.

## Example: User Registration API
### Endpoint
`POST /api/auth/register`

### Request
```json
{
  "email": "user@example.com",
  "password": "string (min 8 chars)",
  "role": "customer|provider"
}
```

### Response (Success)
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "customer",
  "token": "jwt-token"
}
```

### Response (Error)
```json
{
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "A user with this email already exists."
  }
}
```

## Error Handling
- All errors follow a standard format with `code` and `message` fields.
- HTTP status codes are used appropriately (e.g., 400, 401, 404, 500).

## Versioning
- APIs are versioned via URL prefix (e.g., `/api/v1/`).

---
## Changelog
- 2025-10-04: Populated with starter content for user registration API and error handling.