import { auth } from '@/config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          const userData = {
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
          };
          setUser(userData);
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        } else {
          setUser(null);
          await AsyncStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error handling auth state change:', error);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // For now, we'll use a simplified approach that works with Expo
      // This opens a web browser for Google Sign-In
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'travelapp',
        path: 'auth',
      });

      const request = new AuthSession.AuthRequest({
        clientId: '984809187231-kk0k9ocuk14co0ouhi64uef964d9p376.apps.googleusercontent.com',
        scopes: ['openid', 'profile', 'email'],
        redirectUri,
        responseType: AuthSession.ResponseType.Token,
        extraParams: {},
        
      });

      const result = await request.promptAsync({
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      });

      if (result.type === 'success' && result.authentication?.accessToken) {
        // For demo purposes, we'll create a mock user
        // In a real app, you'd exchange the token for user info
        const mockUser = {
          email: 'user@gmail.com',
          name: 'Google User',
        };
        
        setUser(mockUser);
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
