import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve credentials from Vite env or user localStorage configuration
const getCredentials = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const localUrl = localStorage.getItem('mnp_supabase_url');
  const localKey = localStorage.getItem('mnp_supabase_anon_key');

  return {
    url: localUrl || envUrl || '',
    key: localKey || envKey || '',
  };
};

let cachedClient: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

export const getSupabaseClient = (): SupabaseClient | null => {
  const { url, key } = getCredentials();
  
  if (!url || !key) {
    return null;
  }

  if (cachedClient && url === lastUrl && key === lastKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, key);
    lastUrl = url;
    lastKey = key;
    return cachedClient;
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    return null;
  }
};

export const isSupabaseConfigured = (): boolean => {
  const { url, key } = getCredentials();
  return Boolean(url && key);
};
