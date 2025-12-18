import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CasinoTable {
  id: string;
  name: string;
  type: string;
  max_seats: number;
  image_url?: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url?: string;
  location: string;
  capacity?: number;
  is_featured: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  table_id: string;
  booking_date: string;
  time_slot: string;
  num_seats: number;
  status: string;
  created_at: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  min_spent: number;
  max_spent?: number;
  benefits: string[];
  color: string;
  icon: string;
  discount_percentage: number;
  priority_booking: boolean;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  total_spent: number;
  current_tier_id?: string;
  created_at: string;
  updated_at: string;
}
