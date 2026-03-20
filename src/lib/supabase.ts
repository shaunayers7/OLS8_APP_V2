import { createClient } from '@supabase/supabase-js';

// These are public anon keys — safe to expose in frontend.
// Set your actual project URL and anon key here after creating your Supabase project.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
