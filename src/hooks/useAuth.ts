import { useState, useEffect } from 'react';
import { supabase, isSupabaseAvailable } from '../lib/supabase';
import localStorageService from '../services/localStorageService';
import { isLocalOnlyMode } from '../config/runtime';
import type { User } from '@supabase/supabase-js';

const LOCAL_AUTH_KEY = 'local-auth-user';

type LocalAuthUser = {
  id: string;
  email: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
  };
};

function toSupabaseUser(local: LocalAuthUser): User {
  return {
    id: local.id,
    email: local.email,
    app_metadata: {},
    user_metadata: local.user_metadata ?? {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as User;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseAvailable()) {
      const getInitialSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setLoading(false);
      };

      getInitialSession();

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    }

    if (isLocalOnlyMode()) {
      try {
        const stored = localStorage.getItem(LOCAL_AUTH_KEY);
        if (stored) {
          setUser(toSupabaseUser(JSON.parse(stored)));
        } else {
          const localUser = localStorageService.getUser();
          if (localUser) {
            setUser(toSupabaseUser({
              id: localUser._id,
              email: localUser.email,
              user_metadata: {
                first_name: localUser.firstName,
                last_name: localUser.lastName,
              },
            }));
          }
        }
      } catch {
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  const persistLocalUser = (email: string, firstName?: string, lastName?: string): LocalAuthUser => {
    const localUser: LocalAuthUser = {
      id: `local_${Date.now()}`,
      email,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
      },
    };
    localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(localUser));
    localStorage.setItem('auth_token', `local_${localUser.id}`);
    setUser(toSupabaseUser(localUser));
    return localUser;
  };

  const signUp = async (email: string, password: string, userData: {
    firstName: string;
    lastName: string;
  }) => {
    if (isSupabaseAvailable()) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
          },
        },
      });
      if (error) throw error;
      return data;
    }

    if (isLocalOnlyMode()) {
      const existing = localStorageService.getUserByEmail(email);
      if (existing) {
        throw new Error('User with this email already exists');
      }

      localStorageService.createUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: email.toLowerCase(),
        password: localStorageService.hashPassword(password),
        role: 'user',
        isEmailVerified: false,
        isActive: true,
        preferences: {
          language: 'en',
          theme: 'system',
          notifications: {
            email: true,
            push: true,
            privacyAlerts: true,
            assessmentReminders: true,
          },
        },
        privacyProfile: {
          riskLevel: 'medium',
          overallScore: 0,
        },
        subscription: {
          plan: 'free',
          status: 'active',
        },
      });

      const localUser = persistLocalUser(email, userData.firstName, userData.lastName);
      return { user: toSupabaseUser(localUser) };
    }

    throw new Error('Authentication not available');
  };

  const signIn = async (email: string, password: string) => {
    if (isSupabaseAvailable()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    }

    if (isLocalOnlyMode()) {
      const foundUser = localStorageService.getUserByEmail(email);
      if (!foundUser?.password || !localStorageService.verifyPassword(password, foundUser.password)) {
        throw new Error('Invalid email or password');
      }

      localStorageService.saveUser(foundUser);
      persistLocalUser(email, foundUser.firstName, foundUser.lastName);
      return {
        user: toSupabaseUser({
          id: foundUser._id,
          email: foundUser.email,
          user_metadata: {
            first_name: foundUser.firstName,
            last_name: foundUser.lastName,
          },
        }),
      };
    }

    throw new Error('Authentication not available');
  };

  const signOut = async () => {
    if (isSupabaseAvailable()) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return;
    }

    localStorage.removeItem(LOCAL_AUTH_KEY);
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    if (isSupabaseAvailable()) {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return;
    }

    if (isLocalOnlyMode()) {
      const foundUser = localStorageService.getUserByEmail(email);
      if (!foundUser) {
        throw new Error('No account found for that email');
      }
      return;
    }

    throw new Error('Password reset not available');
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    isAuthenticated: !!user,
  };
};
