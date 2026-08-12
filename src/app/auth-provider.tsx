'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  district_id: string;
  school_id: string | null;
  role: 'district_admin' | 'principal' | 'teacher';
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const getMockSession = () => {
  if (typeof window === 'undefined') return { user: null, profile: null };
  const path = window.location.pathname;
  if (path.startsWith('/dashboard/district')) {
    return {
      user: { id: 'a1000000-0000-0000-0000-000000000000', email: 'admin@springfield.edu' } as any,
      profile: {
        id: 'a1000000-0000-0000-0000-000000000000',
        email: 'admin@springfield.edu',
        first_name: 'Gary',
        last_name: 'Superintendent',
        district_id: 'd1111111-1111-1111-1111-111111111111',
        school_id: null,
        role: 'district_admin'
      } as any
    };
  } else if (path.startsWith('/dashboard/school')) {
    return {
      user: { id: 'a2000000-0000-0000-0000-000000000000', email: 'principal.skinner@springfield.edu' } as any,
      profile: {
        id: 'a2000000-0000-0000-0000-000000000000',
        email: 'principal.skinner@springfield.edu',
        first_name: 'Seymour',
        last_name: 'Skinner',
        district_id: 'd1111111-1111-1111-1111-111111111111',
        school_id: 'e2222222-2222-2222-2222-222222222222',
        role: 'principal'
      } as any
    };
  } else if (path.startsWith('/dashboard')) {
    return {
      user: { id: 'e1000000-0000-0000-0000-000000000000', email: 'edna.krabappel@springfield.edu' } as any,
      profile: {
        id: 'e1000000-0000-0000-0000-000000000000',
        email: 'edna.krabappel@springfield.edu',
        first_name: 'Edna',
        last_name: 'Krabappel',
        district_id: 'd1111111-1111-1111-1111-111111111111',
        school_id: 'e2222222-2222-2222-2222-222222222222',
        role: 'teacher'
      } as any
    };
  }
  return { user: null, profile: null };
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserProfile = async (currentUser: User) => {
      try {
        // Query both public.users profile and public.user_roles role assignment
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, email, first_name, last_name, district_id, school_id')
          .eq('id', currentUser.id)
          .single();

        if (userError) throw userError;

        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', currentUser.id)
          .single();

        if (roleError) throw roleError;

        setProfile({
          ...userData,
          role: roleData.role as 'district_admin' | 'principal' | 'teacher',
        });
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    // Initialize session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchUserProfile(session.user);
      } else {
        const { user: mockUser, profile: mockProfile } = getMockSession();
        setUser(mockUser);
        setProfile(mockProfile);
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchUserProfile(session.user);
        } else {
          const { user: mockUser, profile: mockProfile } = getMockSession();
          setUser(mockUser);
          setProfile(mockProfile);
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
