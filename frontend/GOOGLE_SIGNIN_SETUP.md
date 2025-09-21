# Google Sign-In Setup Guide

## 1. Firebase Console Configuration

### Enable Google Sign-In in Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `travelapp-3e483`
3. Go to **Authentication** > **Sign-in method**
4. Click on **Google** provider
5. **Enable** Google Sign-In
6. Set **Project support email** (required)
7. Click **Save**

### Get Web Client ID:
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Go to **General** tab
3. Scroll down to **Your apps** section
4. Find your web app or create one if needed
5. Copy the **Web API Key** and **Project ID**

## 2. Google Cloud Console Configuration

### Enable Google+ API:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `travelapp-3e483`
3. Go to **APIs & Services** > **Library**
4. Search for "Google+ API" and enable it
5. Also enable "Google Sign-In API" if available

### Configure OAuth Consent Screen:
1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type
3. Fill in required fields:
   - App name: "Travel App"
   - User support email: your email
   - Developer contact: your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users (your email for testing)

## 3. Update Configuration

The Google Sign-In is already configured in your code with the client ID from your `google-services.json`:
- Client ID: `984809187231-kk0k9ocuk14co0ouhi64uef964d9p376.apps.googleusercontent.com`

## 4. Testing Google Sign-In

### Test on Device/Emulator:
1. Start your app: `npm start`
2. Go to login screen
3. Tap "Continue with Google"
4. Complete Google Sign-In flow
5. User should be authenticated

### Troubleshooting:
- **"Google Play Services not available"**: Test on a real device or emulator with Google Play Services
- **"Sign-in failed"**: Check that Google Sign-In is enabled in Firebase Console
- **"Invalid client"**: Verify the web client ID is correct

## 5. Production Considerations

### Before Going Live:
1. **OAuth Consent Screen**: Complete the verification process
2. **Domain Verification**: Add your production domain
3. **Privacy Policy**: Required for production apps
4. **Terms of Service**: Required for production apps

### Security:
- Never commit sensitive keys to version control
- Use environment variables for production
- Regularly rotate API keys

## 6. Features Added

✅ **Google Sign-In Button**: Added to login screen with proper styling  
✅ **Firebase Integration**: Google Sign-In works with Firebase Auth  
✅ **User Management**: Google users are stored in Firebase  
✅ **Error Handling**: Proper error messages for failed sign-ins  
✅ **Loading States**: Shows loading during authentication  

## 7. Next Steps

Consider adding:
- **Apple Sign-In** for iOS users
- **Facebook Login** for additional options
- **User Profile Management** after sign-in
- **Account Linking** for users with multiple sign-in methods
