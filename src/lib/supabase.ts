import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get Supabase URL and key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Debug: Log if environment variables are missing (only in development)
if (import.meta.env.DEV) {
  if (!supabaseUrl) {
    console.warn('⚠️ VITE_SUPABASE_URL is not set in environment variables');
  }
  if (!supabaseAnonKey) {
    console.warn('⚠️ VITE_SUPABASE_ANON_KEY is not set in environment variables');
  }
}

// Create Supabase client only if environment variables are set
// This allows the site to run without database configuration
export const supabase: SupabaseClient | null = 
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null;
};

// Types for our database
export interface ResourceSubmission {
  id?: string;
  name: string;
  category: string;
  description: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  submitter_name: string;
  submitter_email: string;
  status?: 'pending' | 'approved' | 'rejected';
  reviewed_by?: string;
  reviewed_at?: string;
  review_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SubmissionFormData {
  name: string;
  category: string;
  description: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  submitterName: string;
  submitterEmail: string;
}

