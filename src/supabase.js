import { createClient } from '@supabase/supabase-js';

// TODO: Replace these with your Supabase Project URL and Anon Key
// You can find these in your Supabase Dashboard -> Settings -> API
export const supabaseUrl = 'https://ytbjwkqddnrdmptuvrtz.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Ymp3a3FkZG5yZG1wdHV2cnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MzU2NDMsImV4cCI6MjA5MjAxMTY0M30.aiBkwyqfVt6e7z5eQvSPve-JzkdVeRQlBzEOhhGBuYs';

const isConfigured = supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY' && supabaseUrl !== '';

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
