import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

// Use a placeholder URL when not configured — prevents createClient from throwing
// on module init. The tasks page shows a "not configured" warning in this case.
export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder-key'
);

export const supabaseConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
