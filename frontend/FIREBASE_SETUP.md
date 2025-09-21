# Firebase Authentication Setup Guide

## 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication in the Firebase Console:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider

## 2. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (</>) 
4. Register your app with a nickname
5. Copy the Firebase configuration object

## 3. Update Firebase Configuration

Replace the placeholder values in `config/firebase.ts` with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## 4. Test the Integration

1. Start your Expo development server: `npm start`
2. Navigate to the login screen
3. Try logging in with a test user (create one in Firebase Console > Authentication > Users)

## 5. Error Handling

The current implementation includes basic error handling. You may want to enhance it to show specific error messages to users based on Firebase error codes.

## 6. Additional Features (Optional)

Consider adding these features:
- User registration
- Password reset
- Email verification
- Social authentication (Google, Facebook, etc.)
- User profile management

## Security Notes

- Never commit your Firebase configuration with real credentials to version control
- Consider using environment variables for sensitive configuration
- Implement proper error handling for production use
