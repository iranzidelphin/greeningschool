# OTP Verification System Documentation

## Overview
This document describes the email OTP (One-Time Password) verification system implemented for the Greening Schools application. The system ensures that users verify their email addresses before gaining access to the dashboard.

## User Flow

### 1. Registration
1. User fills out the registration form with:
   - School name
   - Email address
   - Password
   - Account role (Admin or School)
2. After successful registration, user is redirected to the login page
3. A success message is displayed: "Account created successfully! Please sign in and verify your email."

### 2. Login with Email/Password
1. User enters email and password
2. System checks if email is verified in Firestore
3. **If email is NOT verified:**
   - System generates a 4-digit OTP
   - OTP is stored in Firestore with 5-minute expiration
   - OTP is "sent" to user's email (simulated in console)
   - User is redirected to OTP verification page
4. **If email IS verified:**
   - User is redirected directly to dashboard

### 3. OTP Verification
1. User sees the verification page with:
   - Email address display
   - 4 input fields for OTP digits
   - Resend code button (60-second cooldown)
   - Back to login link
2. User enters the 4-digit code received via email
3. System validates the OTP:
   - Checks if OTP exists in Firestore
   - Checks if OTP has expired (5 minutes)
   - Checks if OTP matches the input
4. **If validation succeeds:**
   - Email is marked as verified in Firestore
   - User is redirected to dashboard
   - Success message is displayed
5. **If validation fails:**
   - Error message is displayed
   - User can retry or request a new code

### 4. Google Sign-In
- Google accounts are automatically marked as verified
- No OTP verification required
- User goes directly to dashboard after login

## Technical Implementation

### Files Created/Modified

#### 1. `src/utils/otpService.js`
**Purpose:** OTP generation, storage, and verification utilities

**Functions:**
- `generateOTP()` - Generates random 4-digit OTP
- `storeOTP(email, otp)` - Stores OTP in Firestore with expiration
- `verifyOTP(email, inputOTP)` - Validates OTP against stored value
- `sendOTPEmail(email, otp)` - Simulates sending OTP via email
- `cleanupExpiredOTPs()` - Placeholder for Cloud Function cleanup

**Firestore Collection:** `otpVerifications`
```
{
  email: string,
  otp: string,
  expiresAt: ISO string,
  createdAt: ISO string
}
```

#### 2. `src/pages/VerifyOTP.jsx`
**Purpose:** OTP verification UI page

**Features:**
- 4 individual input fields for OTP digits
- Auto-focus to next input after entering a digit
- Backspace navigation between inputs
- Paste support for 4-digit codes
- Resend code button with 60-second countdown
- Error and success message display
- Redirect to dashboard after successful verification

#### 3. `src/contexts/AuthContext.jsx`
**Purpose:** Authentication state management

**New Features:**
- `emailVerified` state - tracks if user's email is verified
- `userData` state - stores user data from Firestore
- `markEmailAsVerified()` function - updates verification status in Firestore

**User Document Structure:**
```
{
  uid: string,
  email: string,
  displayName: string,
  role: string,
  schoolId: string,
  emailVerified: boolean,  // NEW FIELD
  createdAt: ISO string,
  lastLogin: ISO string
}
```

#### 4. `src/pages/Login.jsx`
**Purpose:** Login page with OTP trigger

**Changes:**
- Checks `emailVerified` status after successful login
- If not verified: generates OTP, stores it, and redirects to verification page
- If verified: redirects directly to dashboard
- Shows success message from registration

#### 5. `src/pages/Register.jsx`
**Purpose:** Registration page

**Changes:**
- Redirects to login page after successful registration (instead of dashboard)
- Passes success message via route state

#### 6. `src/layouts/DashboardLayout.jsx`
**Purpose:** Dashboard layout with school name display

**New Features:**
- Fetches user data from Firestore
- Displays school name in a banner at the top of the dashboard
- Shows welcome message with school name
- Displays current date

#### 7. `src/routes/index.jsx`
**Purpose:** Application routing

**Changes:**
- Added `/verify-otp` route for OTP verification page

## Security Considerations

### OTP Security
- **Expiration:** OTPs expire after 5 minutes
- **Single Use:** OTP is deleted from Firestore after successful verification
- **Rate Limiting:** 60-second cooldown between resend requests
- **Storage:** OTPs are stored in Firestore (not localStorage) for security

### Email Verification
- **Required:** Users must verify email before accessing dashboard
- **Persistent:** Verification status is stored in Firestore
- **Google Bypass:** Google sign-in users are auto-verified (Google already verified their email)

### Firestore Security Rules
Add these rules to your Firestore security rules:

```javascript
// OTP Verifications collection
match /otpVerifications/{email} {
  allow read, write: if request.auth != null;
}

// Users collection - allow users to update their own emailVerified field
match /users/{userId} {
  allow read: if request.auth != null;
  allow update: if request.auth.uid == userId 
    && request.resource.data.diff(resource.data).affectedKeys()
    .hasOnly(['emailVerified', 'lastLogin']);
}
```

## Production Email Integration

Currently, the system simulates email sending by logging the OTP to the console. For production, integrate with an email service:

### Option 1: SendGrid
```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendOTPEmail(email, otp) {
  const msg = {
    to: email,
    from: 'noreply@greeningschools.com',
    subject: 'Your Verification Code - Greening Schools',
    text: `Your verification code is: ${otp}. It will expire in 5 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Email Verification</h2>
        <p>Your verification code is:</p>
        <h1 style="font-size: 48px; letter-spacing: 8px; color: #059669;">${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      </div>
    `
  };
  
  await sgMail.send(msg);
  return { success: true, message: "Verification code sent to your email" };
}
```

### Option 2: Firebase Extensions (Trigger Email)
1. Install the "Trigger Email" extension from Firebase Console
2. Create a Firestore document in the `mail` collection:
```javascript
export async function sendOTPEmail(email, otp) {
  await addDoc(collection(db, 'mail'), {
    to: email,
    message: {
      subject: 'Your Verification Code - Greening Schools',
      text: `Your verification code is: ${otp}. It will expire in 5 minutes.`,
      html: `<h1>${otp}</h1>`
    }
  });
  return { success: true, message: "Verification code sent to your email" };
}
```

### Option 3: AWS SES
```javascript
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "us-east-1" });

export async function sendOTPEmail(email, otp) {
  const command = new SendEmailCommand({
    Source: 'noreply@greeningschools.com',
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: 'Your Verification Code - Greening Schools' },
      Body: {
        Html: { Data: `<h1>${otp}</h1>` }
      }
    }
  });
  
  await sesClient.send(command);
  return { success: true, message: "Verification code sent to your email" };
}
```

## Testing the System

### Test Case 1: New User Registration
1. Go to `/register`
2. Fill out the registration form
3. Click "Create account"
4. **Expected:** Redirect to `/login` with success message

### Test Case 2: Login with Unverified Email
1. Go to `/login`
2. Enter email and password for unverified account
3. Click "Sign in"
4. **Expected:** Redirect to `/verify-otp` page
5. Check browser console for OTP (or email in production)

### Test Case 3: OTP Verification
1. On `/verify-otp` page
2. Enter the 4-digit OTP from console/email
3. Click "Verify Email"
4. **Expected:** Success message and redirect to dashboard

### Test Case 4: Invalid OTP
1. On `/verify-otp` page
2. Enter incorrect 4-digit code
3. Click "Verify Email"
4. **Expected:** Error message "Invalid verification code"

### Test Case 5: Expired OTP
1. On `/verify-otp` page
2. Wait more than 5 minutes
3. Enter the OTP
4. Click "Verify Email"
5. **Expected:** Error message "Verification code has expired"

### Test Case 6: Resend OTP
1. On `/verify-otp` page
2. Click "Resend Code"
3. **Expected:** New OTP generated, 60-second countdown starts

### Test Case 7: Google Sign-In
1. Go to `/login`
2. Click "Sign in with Google"
3. Complete Google authentication
4. **Expected:** Direct redirect to dashboard (no OTP required)

### Test Case 8: School Name Display
1. Log in as a school user
2. Go to dashboard
3. **Expected:** School name displayed in banner at top of page

## Troubleshooting

### OTP Not Received
- Check browser console for OTP (development mode)
- Verify email service is configured correctly (production)
- Check Firestore `otpVerifications` collection for stored OTP

### Verification Fails
- Check if OTP has expired (5-minute limit)
- Verify OTP matches exactly (no extra spaces)
- Check Firestore security rules allow OTP operations

### School Name Not Displaying
- Verify user document exists in Firestore
- Check `displayName` field is set in user document
- Verify Firestore security rules allow reading user data

### Redirect Issues
- Clear browser cache and cookies
- Check route configuration in `src/routes/index.jsx`
- Verify `ProtectedRoute` and `PublicRoute` components are working

## Future Enhancements

1. **SMS OTP:** Add option to receive OTP via SMS
2. **Backup Codes:** Generate backup codes for account recovery
3. **Biometric Authentication:** Add fingerprint/face ID support
4. **Session Management:** Add ability to view and revoke active sessions
5. **Two-Factor Authentication:** Optional 2FA for additional security
6. **Email Templates:** Customizable email templates for different languages
7. **Rate Limiting:** Implement server-side rate limiting for OTP requests
8. **Audit Logging:** Log all authentication events for security monitoring
