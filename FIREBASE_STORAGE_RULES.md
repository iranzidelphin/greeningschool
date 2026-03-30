# Firebase Storage Rules for Public Image Access

## Overview
This document explains how to configure Firebase Storage rules to allow all users (including non-logged-in users) to view uploaded activity images.

## Current Implementation
- Images are uploaded to Firebase Storage in the `activities/` folder
- Each image is stored with a unique timestamp prefix: `activities/{timestamp}_{filename}`
- The public Activities page fetches approved activities from Firestore and displays their images

## Required Firebase Storage Rules

To allow public read access to uploaded images while maintaining secure upload access, configure your Firebase Storage rules in the Firebase Console:

1. Go to Firebase Console → Storage → Rules
2. Replace the existing rules with the following:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access to all images in the activities folder
    match /activities/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
        && request.resource.size < 10 * 1024 * 1024  // Max 10MB
        && request.resource.contentType.matches('image/.*');  // Only images
    }
    
    // Allow public read access to school profile images
    match /schools/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
        && request.resource.size < 10 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }
    
    // Default rule - deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## Rules Explanation

### Activities Folder (`/activities/`)
- **Read**: `allow read: if true;` - Anyone can view uploaded activity images
- **Write**: 
  - `request.auth != null` - User must be authenticated
  - `request.resource.size < 10 * 1024 * 1024` - File size must be less than 10MB
  - `request.resource.contentType.matches('image/.*')` - Only image files allowed

### Schools Folder (`/schools/`)
- Same rules as activities folder for consistency

### Default Rule
- Denies all other access to ensure security

## How It Works

1. **Upload Flow**:
   - School user uploads an image via the Upload Activity page
   - Image is stored in Firebase Storage at `activities/{timestamp}_{filename}`
   - The public download URL is saved to Firestore along with activity details

2. **Viewing Flow**:
   - Public Activities page fetches approved activities from Firestore
   - Each activity includes the `imageUrl` field pointing to Firebase Storage
   - The `ActivityCard` component displays the image using this URL
   - Since read access is public, anyone can view the images

## Security Considerations

- **Upload Security**: Only authenticated users can upload images
- **File Validation**: 
  - Maximum file size: 10MB
  - Only image files are accepted
- **Public Read**: All users can view images (including non-logged-in users)
- **Firestore Security**: Activities require admin approval before appearing publicly

## Testing the Rules

1. **Test Public Read Access**:
   - Open an incognito/private browser window
   - Navigate to the public Activities page
   - Verify that images load correctly

2. **Test Upload Security**:
   - Try uploading without being logged in (should fail)
   - Try uploading a file larger than 10MB (should fail)
   - Try uploading a non-image file (should fail)

3. **Test Authenticated Upload**:
   - Log in as a school user
   - Upload an activity with an image
   - Verify the image appears on the public Activities page

## Troubleshooting

### Images Not Loading
- Check Firebase Storage rules are correctly configured
- Verify the `imageUrl` field exists in the Firestore activity document
- Check browser console for CORS or permission errors

### Upload Fails
- Ensure user is authenticated
- Verify file is an image and under 10MB
- Check Firebase Storage rules allow write access for authenticated users

### Images Load But Don't Appear Publicly
- Verify the activity status is "approved" in Firestore
- Check that the `getApprovedActivities` function is being called
- Ensure the `imageUrl` field is correctly saved when creating the activity
