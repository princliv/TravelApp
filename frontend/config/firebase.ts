import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration from google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyCKCsMDf0oP3xfcE_jl7xcxHVNu9kRzwhQ",
  authDomain: "travelapp-3e483.firebaseapp.com",
  projectId: "travelapp-3e483",
  storageBucket: "travelapp-3e483.firebasestorage.app",
  messagingSenderId: "984809187231",
  appId: "1:984809187231:android:5358e4e48f88d02992bfaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
