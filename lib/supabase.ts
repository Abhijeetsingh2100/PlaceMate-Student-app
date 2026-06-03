import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nopjyfzmzngfwvfzqdun.supabase.co';
const supabaseAnonKey = 'sb_publishable_jVm58UH3RCFg8IQ4EWMAEw_MUMY5iOA';

let getTokenRef: () => Promise<string | null> = async () => null;

export const setSupabaseTokenProvider = (provider: () => Promise<string | null>) => {
  getTokenRef = provider;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: async (url, options = {}) => {
      let token = null;
      try {
        token = await getTokenRef();
      } catch (err) {
        console.warn('Clerk JWT Template missing or error:', err);
      }
      const headers = new Headers(options?.headers);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return fetch(url, { ...options, headers });
    },
  },
});
