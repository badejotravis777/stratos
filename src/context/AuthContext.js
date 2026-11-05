import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUserId = useRef(undefined);

  const fetchProfile = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('*, niches(name, is_live), plans(name, is_done_for_you, feature_flags)')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    } else {
      setProfile(data);
    }
  }, []);

  const handleSession = useCallback(
    async (session) => {
      const nextUser = session?.user ?? null;
      const nextId = nextUser?.id ?? null;
      setUser(nextUser);

      // Token refreshes and re-auth for the same user shouldn't blank the app.
      if (nextId === currentUserId.current) return;
      currentUserId.current = nextId;

      setLoading(true);
      if (nextUser) {
        await fetchProfile(nextUser.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    },
    [fetchProfile]
  );

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, [handleSession]);

  const signOut = async () => {
    await supabase.auth.signOut();
    currentUserId.current = null;
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
