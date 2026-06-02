import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nopjyfzmzngfwvfzqdun.supabase.co';

const supabaseAnonKey = 'sb_publishable_jVm58UH3RCFg8IQ4EWMAEw_MUMY5iOA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
