/*
  # Casino Management System Database Schema

  ## Overview
  Complete database schema for a casino management system with table bookings,
  events management, and membership tiers.

  ## New Tables

  ### 1. `casino_tables`
  Represents available gaming tables/stations in the casino
  - `id` (uuid, primary key)
  - `name` (text) - Name of the table (e.g., "Roulette Table 1")
  - `type` (text) - Type of game (slot, roulette, poker, blackjack, etc.)
  - `max_seats` (integer) - Maximum number of seats available
  - `image_url` (text, nullable) - Image of the table
  - `description` (text, nullable) - Description of the table
  - `is_active` (boolean) - Whether the table is currently available
  - `created_at` (timestamptz)

  ### 2. `events`
  Casino events (tournaments, shows, special nights, etc.)
  - `id` (uuid, primary key)
  - `title` (text) - Event name
  - `description` (text) - Event details
  - `event_date` (timestamptz) - When the event occurs
  - `image_url` (text, nullable) - Event promotional image
  - `location` (text) - Where in the casino
  - `capacity` (integer, nullable) - Max attendees
  - `is_featured` (boolean) - Featured event flag
  - `created_at` (timestamptz)

  ### 3. `bookings`
  Table reservations with time slots
  - `id` (uuid, primary key)
  - `user_id` (uuid) - References auth.users
  - `table_id` (uuid) - References casino_tables
  - `booking_date` (date) - Date of booking
  - `time_slot` (text) - Time slot (e.g., "14:00-16:00")
  - `num_seats` (integer) - Number of seats booked
  - `status` (text) - booking status (pending, confirmed, cancelled)
  - `created_at` (timestamptz)

  ### 4. `membership_tiers`
  Different membership levels based on spending
  - `id` (uuid, primary key)
  - `name` (text) - Tier name (Bronze, Silver, Gold, Platinum, Diamond)
  - `min_spent` (numeric) - Minimum amount spent to reach tier
  - `max_spent` (numeric, nullable) - Maximum amount for tier
  - `benefits` (jsonb) - Array of benefits
  - `color` (text) - Display color for tier
  - `icon` (text) - Icon identifier
  - `discount_percentage` (numeric) - Discount on bookings
  - `priority_booking` (boolean) - Early access to bookings
  - `created_at` (timestamptz)

  ### 5. `user_profiles`
  Extended user information
  - `id` (uuid, primary key) - References auth.users
  - `email` (text)
  - `full_name` (text)
  - `phone` (text, nullable)
  - `total_spent` (numeric) - Total amount spent
  - `current_tier_id` (uuid, nullable) - References membership_tiers
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public can view tables, events, and membership tiers
  - Authenticated users can create bookings for themselves
  - Users can only view and modify their own bookings and profile
*/

-- Create casino_tables table
CREATE TABLE IF NOT EXISTS casino_tables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  max_seats integer NOT NULL DEFAULT 1,
  image_url text,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  image_url text,
  location text NOT NULL,
  capacity integer,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  table_id uuid NOT NULL REFERENCES casino_tables(id) ON DELETE CASCADE,
  booking_date date NOT NULL,
  time_slot text NOT NULL,
  num_seats integer NOT NULL,
  status text DEFAULT 'confirmed',
  created_at timestamptz DEFAULT now()
);

-- Create membership_tiers table
CREATE TABLE IF NOT EXISTS membership_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  min_spent numeric NOT NULL,
  max_spent numeric,
  benefits jsonb DEFAULT '[]'::jsonb,
  color text NOT NULL,
  icon text NOT NULL,
  discount_percentage numeric DEFAULT 0,
  priority_booking boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  phone text,
  total_spent numeric DEFAULT 0,
  current_tier_id uuid REFERENCES membership_tiers(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE casino_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for casino_tables
CREATE POLICY "Anyone can view active casino tables"
  ON casino_tables FOR SELECT
  USING (is_active = true);

-- RLS Policies for events
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  USING (true);

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for membership_tiers
CREATE POLICY "Anyone can view membership tiers"
  ON membership_tiers FOR SELECT
  USING (true);

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_table_id ON bookings(table_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings(booking_date, time_slot);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_user_profiles_tier ON user_profiles(current_tier_id);

-- Insert default membership tiers
INSERT INTO membership_tiers (name, min_spent, max_spent, benefits, color, icon, discount_percentage, priority_booking)
VALUES 
  ('Bronze', 0, 999, '["Welcome bonus", "Basic lounge access", "Monthly newsletter"]'::jsonb, '#CD7F32', 'award', 0, false),
  ('Silver', 1000, 4999, '["10% discount on bookings", "Priority customer service", "Complimentary drinks", "Silver lounge access"]'::jsonb, '#C0C0C0', 'award', 10, false),
  ('Gold', 5000, 14999, '["15% discount on bookings", "Priority booking", "Gold lounge access", "Free valet parking", "Birthday bonus"]'::jsonb, '#FFD700', 'crown', 15, true),
  ('Platinum', 15000, 49999, '["20% discount on bookings", "VIP event access", "Platinum lounge access", "Personal host", "Complimentary meals"]'::jsonb, '#E5E4E2', 'gem', 20, true),
  ('Diamond', 50000, NULL, '["25% discount on bookings", "Exclusive Diamond lounge", "Private tables available", "Luxury transportation", "Personalized concierge", "Suite accommodations"]'::jsonb, '#B9F2FF', 'sparkles', 25, true)
ON CONFLICT (name) DO NOTHING;

-- Insert sample casino tables
INSERT INTO casino_tables (name, type, max_seats, description, image_url)
VALUES 
  ('Roulette Table 1', 'roulette', 8, 'Classic European roulette with professional dealers', 'https://images.pexels.com/photos/5922287/pexels-photo-5922287.jpeg'),
  ('Roulette Table 2', 'roulette', 8, 'American roulette with double zero', 'https://images.pexels.com/photos/5922287/pexels-photo-5922287.jpeg'),
  ('Blackjack Table 1', 'blackjack', 7, 'High stakes blackjack with $100 minimum', 'https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg'),
  ('Blackjack Table 2', 'blackjack', 7, 'Standard blackjack with $25 minimum', 'https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg'),
  ('Poker Table 1', 'poker', 9, 'Texas Hold''em tournament table', 'https://images.pexels.com/photos/5922288/pexels-photo-5922288.jpeg'),
  ('Poker Table 2', 'poker', 9, 'Cash game poker table', 'https://images.pexels.com/photos/5922288/pexels-photo-5922288.jpeg'),
  ('Baccarat Table', 'baccarat', 14, 'High-limit baccarat with private area', 'https://images.pexels.com/photos/4219630/pexels-photo-4219630.jpeg'),
  ('Craps Table', 'craps', 16, 'Full-size craps table with experienced dealers', 'https://images.pexels.com/photos/4219631/pexels-photo-4219631.jpeg'),
  ('Slot Station 1', 'slot', 1, 'Premium video slot machines', 'https://images.pexels.com/photos/5407221/pexels-photo-5407221.jpeg'),
  ('Slot Station 2', 'slot', 1, 'Progressive jackpot slots', 'https://images.pexels.com/photos/5407221/pexels-photo-5407221.jpeg')
ON CONFLICT DO NOTHING;

-- Insert sample events
INSERT INTO events (title, description, event_date, location, capacity, is_featured, image_url)
VALUES 
  ('New Year''s Gala', 'Ring in the new year with champagne, live music, and exclusive gaming tables. Dress code: Black tie.', '2025-12-31 20:00:00+00', 'Grand Ballroom', 200, true, 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg'),
  ('High Rollers Poker Tournament', 'Entry fee $10,000. Prize pool $500,000. Championship poker tournament for experienced players.', '2025-12-20 18:00:00+00', 'Tournament Hall', 100, true, 'https://images.pexels.com/photos/5922288/pexels-photo-5922288.jpeg'),
  ('Weekend Jazz Night', 'Live jazz performances every weekend. Enjoy cocktails and gaming with smooth music.', '2025-12-15 19:00:00+00', 'Main Floor', 150, false, 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg'),
  ('Diamond Members Exclusive', 'Private event for Diamond tier members with complimentary champagne and hors d''oeuvres.', '2025-12-18 17:00:00+00', 'Diamond Lounge', 50, false, 'https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg'),
  ('Holiday Slots Marathon', 'Special holiday-themed slot machines with increased payouts and prizes.', '2025-12-22 12:00:00+00', 'Slots Hall', 300, true, 'https://images.pexels.com/photos/5407221/pexels-photo-5407221.jpeg')
ON CONFLICT DO NOTHING;