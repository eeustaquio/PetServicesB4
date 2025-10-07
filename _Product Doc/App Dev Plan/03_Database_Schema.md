
# Firebase Firestore Schema & Data Structure

This document details the Firestore NoSQL document structure, collection design, and data management strategy for the PetServices Platform.

---

## 1. Firestore Collection Structure
```
/users/{userId}
  ├── /pets/{petId}
  ├── /bookings/{bookingId}
  └── /notifications/{notificationId}

/services/{serviceId}
  ├── /reviews/{reviewId}
  └── /availability/{timeSlot}

/transactions/{transactionId}
/serviceTypes/{typeId}
/adminSettings/{settingId}
```
*Note: Firestore uses collections and documents instead of tables and rows.*

---

## 2. Document Structures

### Users Collection
```javascript
/users/{userId}
{
  id: string,
  email: string,
  displayName: string,
  photoURL: string,
  role: 'customer' | 'provider' | 'admin',
  profile: {
    phone: string,
    address: {
      street: string,
      city: string,
      zipCode: string
    },
    preferences: {
      notifications: boolean,
      language: 'en' | 'tl'
    }
  },
  createdAt: timestamp,
  updatedAt: timestamp,
  isActive: boolean
}
```

### Services Collection
```javascript
/services/{serviceId}
{
  id: string,
  providerId: string, // reference to users/{userId}
  title: string,
  description: string,
  category: string,
  price: {
    amount: number,
    currency: 'PHP',
    type: 'fixed' | 'hourly' | 'per-visit'
  },
  location: {
    address: string,
    coordinates: geopoint,
    serviceArea: number // radius in km
  },
  availability: {
    schedule: {
      [dayOfWeek]: {
        start: string, // "09:00"
        end: string,   // "17:00"
        isAvailable: boolean
      }
    },
    blackoutDates: timestamp[]
  },
  media: {
    images: string[], // Firebase Storage URLs
    videos: string[]
  },
  status: 'active' | 'inactive' | 'pending',
  rating: {
    average: number,
    count: number
  },
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Pets Subcollection
```javascript
/users/{userId}/pets/{petId}
{
  id: string,
  name: string,
  species: 'dog' | 'cat' | 'bird' | 'other',
  breed: string,
  age: number,
  weight: number,
  gender: 'male' | 'female',
  photos: string[], // Firebase Storage URLs
  medicalInfo: {
    vaccinations: [{
      name: string,
      date: timestamp,
      expiryDate: timestamp
    }],
    allergies: string[],
    medications: string[],
    specialNeeds: string
  },
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Bookings Subcollection
```javascript
/users/{userId}/bookings/{bookingId}
{
  id: string,
  serviceId: string, // reference
  providerId: string, // reference
  petIds: string[], // array of pet references
  scheduledDate: timestamp,
  duration: number, // in minutes
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled',
  location: {
    type: 'provider-location' | 'customer-location',
    address: string,
    coordinates: geopoint
  },
  pricing: {
    subtotal: number,
    fees: number,
    total: number,
    currency: 'PHP'
  },
  notes: {
    customer: string,
    provider: string,
    internal: string
  },
  createdAt: timestamp,
  updatedAt: timestamp,
  completedAt: timestamp
}
```

---

## 3. Security Rules
```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Pets subcollection
      match /pets/{petId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // Bookings subcollection
      match /bookings/{bookingId} {
        allow read, write: if request.auth != null && 
          (request.auth.uid == userId || 
           request.auth.uid == resource.data.providerId);
      }
    }
    
    // Services are publicly readable, writable by owners
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.uid == resource.data.providerId;
    }
  }
}
```

---

## 4. Data Migration Strategy
- **Firebase Admin SDK** for bulk data operations
- **Firestore batch writes** for efficient data seeding
- **Cloud Functions** for automated data transformations
- **Firebase CLI** for schema deployment and backup

---

## 5. Cloud Functions for Data Operations
```javascript
// Example Cloud Function for booking creation
exports.createBooking = functions.https.onCall(async (data, context) => {
  // Validate authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { serviceId, petIds, scheduledDate } = data;
  const userId = context.auth.uid;
  
  // Create booking document
  const bookingRef = db.collection('users').doc(userId)
    .collection('bookings').doc();
  
  await bookingRef.set({
    id: bookingRef.id,
    serviceId,
    petIds,
    scheduledDate: new Date(scheduledDate),
    status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
  return { bookingId: bookingRef.id };
});
```

---

## 6. Indexing Strategy
```javascript
// Composite indexes for efficient querying
// These are defined in firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "services",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "category", "order": "ASCENDING" },
        { "fieldPath": "location.coordinates", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "bookings", 
      "queryScope": "COLLECTION_GROUP",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "scheduledDate", "order": "ASCENDING" }
      ]
    }
  ]
}
```

---

## Actionable Checklist
- [ ] Set up Firebase project and Firestore database
- [ ] Configure Firestore security rules
- [ ] Define collection structures and document schemas
- [ ] Create composite indexes for optimal query performance
- [ ] Implement Cloud Functions for complex operations
- [ ] Set up Firebase Admin SDK for backend operations
- [ ] Prepare seed data using Firebase Admin SDK
- [ ] Configure backup and restore procedures

---

## Changelog
- 2025-10-06: Migrated from SQL/PostgreSQL to Firebase Firestore NoSQL architecture. Updated all schemas to use document-based structure with subcollections.
- 2025-10-04: Regenerated and enhanced schema and migration plan to align with latest requirements, features, and solution plan. Added entity tables and actionable checklist.
