# Service Type Management - Functional Requirements

## Inputs
- Admin actions (create, edit, remove service types)
- Service type data (name, description, category)

## Outputs
- Updated service type list
- Notifications to users/providers (if types change)

## Workflows
1. Admin creates/edits/removes service types.
2. System updates service type list and notifies affected users/providers.

## Edge Cases
- Duplicate service type: Prevent or warn admin.
- Deleting in-use type: Warn and require reassignment.
- Network failure: Retry or save changes.

## UX & UI Considerations
- **User interface elements:** Service type list, add/edit forms, delete confirmation.
- **Navigation:** Admin dashboard section.
- **Accessibility:** Form labels, keyboard navigation, error messages.
- **Design style:** Consistent with admin UI, clear feedback.

## Technical Requirements
- **APIs / integrations:** Internal API for service type management.
- **Database schema:**
  - `service_types` (id, name, description, category)
- **Performance needs:** Fast updates, scalable for many types.
- **Security:** Admin-only access, input validation, audit logs.
