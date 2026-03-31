-- Wedding invitation: guests table
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS guests (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token            TEXT UNIQUE NOT NULL,
  name             TEXT NOT NULL,
  passes           INTEGER NOT NULL DEFAULT 1,
  rsvp_status      TEXT NOT NULL DEFAULT 'pending'
                     CHECK (rsvp_status IN ('pending', 'confirmed', 'declined')),
  attendees_count  INTEGER NOT NULL DEFAULT 0,
  responded_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Fast lookup by token
CREATE INDEX IF NOT EXISTS idx_guests_token ON guests(token);

-- Enable Row Level Security (backend bypasses via service role key)
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Seed example guest (optional — replace values as needed)
-- INSERT INTO guests (token, name, passes)
-- VALUES ('abc123xyz', 'Familia Rodríguez', 4);
