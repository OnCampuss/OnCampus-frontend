import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvlfdoyarqaignybhjid.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2bGZkb3lhcnFhaWdueWJoamlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NDMzMzUsImV4cCI6MjA0NTIxOTMzNX0.n5OmqgkjGQLmpY2pYEFgqQP9fsk6vCQjLUDux4RVrt4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const AppStateListener = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        try {
          await supabase.auth.startAutoRefresh();
        } catch (error) {
          console.error('Erro ao iniciar a atualização automática do token:', error.message);
        }
      } else {
        try {
          await supabase.auth.stopAutoRefresh();
        } catch (error) {
          console.error('Erro ao parar a atualização automática do token:', error.message);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return null;
};

export default AppStateListener;
