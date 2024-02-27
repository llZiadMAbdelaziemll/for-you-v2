import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fbkqtvpwidcxklebcubn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZia3F0dnB3aWRjeGtsZWJjdWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0NTI2OTQsImV4cCI6MjAyMzAyODY5NH0.m_yHYNGqZ0_8CeXu9uRuNTqE6x8VVSWMFHL0SrWAyQc";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
