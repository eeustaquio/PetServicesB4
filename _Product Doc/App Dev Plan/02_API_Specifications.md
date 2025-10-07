
# API Specifications (Firebase Architecture)

This document defines Firebase Cloud Functions, callable functions, and client SDK operations for the PetServices Platform, aligned with Firebase/Firestore architecture.

---

## API Overview
The platform uses Firebase Cloud Functions for backend operations and Firebase client SDKs for direct database access. Authentication is handled by Firebase Auth, and all operations respect Firestore security rules.

---

## 1. Firebase Authentication (Client SDK)
| Operation | Method | Description | Implementation |
|-----------|---------|-------------|----------------|
| Register | `createUserWithEmailAndPassword()` | Register new user | Firebase Auth SDK |
| Login | `signInWithEmailAndPassword()` | User login | Firebase Auth SDK |
| Social Login | `signInWithPopup()` | Google/Facebook login | Firebase Auth SDK |
| Logout | `signOut()` | User logout | Firebase Auth SDK |
| Password Reset | `sendPasswordResetEmail()` | Request password reset | Firebase Auth SDK |
| Email Verify | `sendEmailVerification()` | Email verification | Firebase Auth SDK |

**Notes:**
- All authentication handled by Firebase Auth service
- Custom claims for role-based access control
- Real-time auth state listeners for automatic UI updates

---

## 2. User Management (Firestore + Cloud Functions)
| Operation | Type | Description | Implementation |
|-----------|------|-------------|----------------|
| Get Profile | Firestore Read | Get user profile | `doc('users/{userId}').get()` |
| Update Profile | Cloud Function | Update user profile | `updateUserProfile(userData)` |
| Upload Avatar | Cloud Function | Upload profile picture | `uploadUserAvatar(file)` |
| List Users (Admin) | Cloud Function | List all users | `listUsers({ role, status })` |
| Delete User (Admin) | Cloud Function | Deactivate user | `deactivateUser(userId)` |

---

## 3. Service Management (Firestore + Cloud Functions)
| Operation | Type | Description | Implementation |
|-----------|------|-------------|----------------|
| List Services | Firestore Query | List all services with filters | `collection('services').where('status', '==', 'active')` |
| Get Service Details | Firestore Read | Get service by ID | `doc('services/{serviceId}').get()` |
| Search Services | Cloud Function | Search with geolocation | `searchServices({ location, radius, category })` |
| Create Service | Cloud Function | Create new service | `createService(serviceData)` |
| Update Service | Cloud Function | Update service details | `updateService(serviceId, updates)` |
| Delete Service | Cloud Function | Soft delete service | `archiveService(serviceId)` |

---

## 4. Booking Management (Firestore Subcollections + Cloud Functions)
| Operation | Type | Description | Implementation |
|-----------|------|-------------|----------------|
| List User Bookings | Firestore Query | Get user's bookings | `collection('users/{userId}/bookings')` |
| Get Booking Details | Firestore Read | Get booking by ID | `doc('users/{userId}/bookings/{bookingId}')` |
| Create Booking | Cloud Function | Create new booking with validation | `createBooking({ serviceId, petIds, date })` |
| Update Booking | Cloud Function | Update booking status | `updateBookingStatus(bookingId, status)` |
| Cancel Booking | Cloud Function | Cancel with refund logic | `cancelBooking(bookingId, reason)` |
| Provider Bookings | Firestore Query | Get provider's bookings | `collectionGroup('bookings').where('providerId', '==', uid)` |

---

## 5. Pet Management (Firestore Subcollections)
| Operation | Type | Description | Implementation |
|-----------|------|-------------|----------------|
| List User Pets | Firestore Query | Get user's pets | `collection('users/{userId}/pets')` |
| Add Pet | Cloud Function | Add pet with photo upload | `addPet({ name, species, breed, photos })` |
| Update Pet | Firestore Write | Update pet information | `doc('users/{userId}/pets/{petId}').update()` |
| Upload Pet Photos | Cloud Function | Upload to Firebase Storage | `uploadPetPhotos(petId, files)` |

---

## 6. Notifications (Firestore + FCM)
| Operation | Type | Description | Implementation |
|-----------|------|-------------|----------------|
| Send Notification | Cloud Function | Send push/email notification | `sendNotification({ userId, type, message })` |
| List Notifications | Firestore Query | Get user notifications | `collection('users/{userId}/notifications')` |
| Mark as Read | Firestore Update | Mark notification as read | `doc('notifications/{notificationId}').update()` |
| FCM Token | Cloud Function | Register FCM token | `registerFCMToken(token)` |

---

## 7. Admin & Analytics (Cloud Functions + Firebase Analytics)
| Operation | Type | Description | Implementation |
|-----------|------|-------------|----------------|
| Dashboard Analytics | Cloud Function | Get platform metrics | `getAdminDashboard({ dateRange, metrics })` |
| User Management | Cloud Function | Admin user operations | `adminUserOperations({ action, userId })` |
| Feature Toggles | Firestore Update | Enable/disable features | `doc('adminSettings/features').update()` |
| Revenue Analytics | Cloud Function | Financial reporting | `getRevenueAnalytics({ period, breakdown })` |

---

## 8. Error Handling (Firebase Functions)
```javascript
// Standardized error responses for Cloud Functions
exports.handleError = (error, context) => {
  if (error.code === 'permission-denied') {
    throw new functions.https.HttpsError('permission-denied', 'Insufficient permissions');
  }
  if (error.code === 'not-found') {
    throw new functions.https.HttpsError('not-found', 'Resource not found');
  }
  throw new functions.https.HttpsError('internal', 'Internal server error');
};
```

---

## 9. Security (Firebase Rules + Auth)
- **Authentication:** Firebase Auth with custom claims for roles
- **Authorization:** Firestore Security Rules for data access control
- **Validation:** Input validation in Cloud Functions
- **Rate Limiting:** Firebase App Check for abuse prevention

---

## 10. Real-time Features
```javascript
// Real-time listeners for live updates
const unsubscribe = db.collection('users/{userId}/bookings')
  .where('status', '==', 'pending')
  .onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        // Handle new booking
      }
    });
  });
```

---

## Actionable Checklist
- [ ] Set up Firebase Cloud Functions project
- [ ] Implement callable functions for complex operations
- [ ] Configure Firestore security rules
- [ ] Set up Firebase Authentication with custom claims
- [ ] Implement real-time listeners for live updates
- [ ] Configure Firebase Cloud Messaging for notifications
- [ ] Set up Firebase Storage for file uploads
- [ ] Add error handling and validation to all functions

---

## Changelog
- 2025-10-04: Regenerated and enhanced API specifications to align with latest requirements, features, and solution plan. Added detailed endpoint tables and actionable checklist.
