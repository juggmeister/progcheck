-- Fix RLS INSERT Policy
-- This uses TO public which is more reliable than TO anon, authenticated

-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Allow public submissions" ON resource_submissions;

-- Create a new policy using TO public (more reliable)
CREATE POLICY "Allow public submissions"
  ON resource_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);
