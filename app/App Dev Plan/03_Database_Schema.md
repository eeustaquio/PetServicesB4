
# Database Schema & Migration Plan

This document details the database schema, entity relationships, and migration strategy for the PetServices Platform, aligned with the latest requirements and features.

---

## 1. Entity-Relationship Diagram (ERD)
```
User ──< Booking >── Service
 |                |
 |                └──< Notification
 └──< Pet
Service ──< Transaction
Booking ──< Feedback
```
*Note: See full ERD diagram in design documentation.*

---

## 2. Main Entities & Fields
| Entity        | Fields                                                                 |
|-------------- |-----------------------------------------------------------------------|
| User          | id, name, email, passwordHash, role, createdAt, updatedAt             |
| Pet           | id, userId, name, type, breed, age, notes, createdAt, updatedAt       |
| Service       | id, providerId, title, description, price, category, location, status, createdAt, updatedAt |
| Booking       | id, userId, serviceId, petId, date, time, status, notes, createdAt, updatedAt |
| Notification  | id, userId, type, message, read, createdAt                            |
| Transaction   | id, bookingId, amount, status, paymentMethod, createdAt               |
| Feedback      | id, bookingId, userId, rating, comment, createdAt                     |

---

## 3. Migration Plan
- Use migration tools (e.g., Sequelize, TypeORM, Prisma, EF Core)
- Define initial schema and relationships
- Prepare seed data for development/testing
- Version migrations for future schema changes

---

## 4. Example Table Definitions (SQL)
```sql
CREATE TABLE User (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	email VARCHAR(255) UNIQUE,
	passwordHash VARCHAR(255),
	role VARCHAR(20),
	createdAt TIMESTAMP,
	updatedAt TIMESTAMP
);

CREATE TABLE Pet (
	id SERIAL PRIMARY KEY,
	userId INTEGER REFERENCES User(id),
	name VARCHAR(100),
	type VARCHAR(50),
	breed VARCHAR(50),
	age INTEGER,
	notes TEXT,
	createdAt TIMESTAMP,
	updatedAt TIMESTAMP
);
-- ...other tables follow similar pattern
```

---

## Actionable Checklist
- [ ] Define all entities and relationships
- [ ] Implement migrations using chosen tool
- [ ] Prepare and load seed data
- [ ] Document schema changes and migration steps

---

## Changelog
- 2025-10-04: Regenerated and enhanced schema and migration plan to align with latest requirements, features, and solution plan. Added entity tables and actionable checklist.
