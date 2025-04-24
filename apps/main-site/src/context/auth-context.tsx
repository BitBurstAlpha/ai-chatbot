'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export type UserRole = 'admin' | 'user' | 'agent';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuthStatus = async () => {
      try {
        // Get token from cookie
        const token = Cookies.get('authToken');

        if (token) {
          try {
            const response = await fetch(
              'https://web-production-59b12.up.railway.app/api/v1/user/me',
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            } else {
              // Token is invalid, remove it
              Cookies.remove('authToken', { path: '/' });
            }
          } catch (err) {
            console.error('Failed to fetch user data:', err);
            Cookies.remove('authToken', { path: '/' });
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      checkAuthStatus();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://web-production-59b12.up.railway.app/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      const { access_token } = data;

      // Save token as a cookie
      Cookies.set('authToken', access_token, {
        expires: 7, // 7 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      // Get current user data
      const userResponse = await fetch(
        'https://web-production-59b12.up.railway.app/api/v1/user/me',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await userResponse.json();
      setUser(userData);

      // Redirect to home page
      router.push('/home');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear from cookies
    Cookies.remove('authToken', { path: '/' });

    setUser(null);
    router.push('/login');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
