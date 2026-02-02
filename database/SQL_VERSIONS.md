# SQL Schema Versions History

This document shows all versions of the SQL schema that have been used.

---

## Version 1: Original Schema (Initial)
**File:** `database/schema.sql` (original)

```sql
-- Policy: Anyone can insert submissions
CREATE POLICY "Allow public submissions"
  ON resource_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

**Issue:** Sometimes `TO anon, authenticated` doesn't work reliably in Supabase.

---

## Version 2: Using `TO public` (More Permissive)
**File:** `database/fix-rls-policy.sql`

```sql
CREATE POLICY "Allow public submissions"
  ON resource_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);
```

**Change:** Used `TO public` instead of `TO anon, authenticated` for broader access.

---

## Version 3: Separate Policies for Anon and Authenticated (Current)
**File:** `database/schema.sql` (current - after your edit)

```sql
-- Allow anonymous users to insert
CREATE POLICY "anon_insert_policy"
  ON resource_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to insert
CREATE POLICY "authenticated_insert_policy"
  ON resource_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

**Change:** Split into two separate policies - one for anonymous users, one for authenticated users. This is the most explicit approach.

---

## Complete Current Schema (Version 3)

```sql
-- RTP Community Hub Database Schema
-- Complete rewrite for reliability

-- ============================================
-- STEP 1: Create the table
-- ============================================

CREATE TABLE IF NOT EXISTS resource_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Resource Information
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  address VARCHAR(200),
  phone VARCHAR(20),
  email VARCHAR(100),
  website VARCHAR(200),
  
  -- Submitter Information
  submitter_name VARCHAR(100) NOT NULL,
  submitter_email VARCHAR(100) NOT NULL,
  
  -- Status tracking
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STEP 2: Create indexes for performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_submissions_status ON resource_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_category ON resource_submissions(category);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON resource_submissions(created_at DESC);

-- ============================================
-- STEP 3: Enable Row Level Security
-- ============================================

ALTER TABLE resource_submissions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 4: Drop ALL existing policies (clean slate)
-- ============================================

DO $$ 
DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'resource_submissions') 
  LOOP
    EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON resource_submissions';
  END LOOP;
END $$;

-- ============================================
-- STEP 5: Create INSERT policies
-- ============================================

-- Allow anonymous users to insert
CREATE POLICY "anon_insert_policy"
  ON resource_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to insert
CREATE POLICY "authenticated_insert_policy"
  ON resource_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ============================================
-- STEP 6: Create SELECT policies
-- ============================================

-- Anonymous users can only see approved resources
CREATE POLICY "anon_select_policy"
  ON resource_submissions
  FOR SELECT
  TO anon
  USING (status = 'approved');

-- Authenticated users can see all submissions
CREATE POLICY "authenticated_select_policy"
  ON resource_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- STEP 7: Create UPDATE policy (admin only)
-- ============================================

CREATE POLICY "admin_update_policy"
  ON resource_submissions
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN ('a195c034-acbb-4aff-a39f-55bcc289e0b9')
  )
  WITH CHECK (
    auth.uid() IN ('a195c034-acbb-4aff-a39f-55bcc289e0b9')
  );

-- ============================================
-- STEP 8: Create DELETE policy (deny all)
-- ============================================

CREATE POLICY "deny_delete_policy"
  ON resource_submissions
  FOR DELETE
  TO public
  USING (false);

-- ============================================
-- STEP 9: Create function for auto-updating timestamps
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- STEP 10: Create trigger for auto-updating timestamps
-- ============================================

DROP TRIGGER IF EXISTS update_resource_submissions_updated_at ON resource_submissions;

CREATE TRIGGER update_resource_submissions_updated_at
  BEFORE UPDATE ON resource_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STEP 11: Create view for approved resources
-- ============================================

CREATE OR REPLACE VIEW approved_resources AS
SELECT 
  id,
  name,
  category,
  description,
  address,
  phone,
  email,
  website,
  created_at
FROM resource_submissions
WHERE status = 'approved'
ORDER BY created_at DESC;
```

---

## Comparison of INSERT Policy Approaches

| Version | Syntax | Pros | Cons |
|---------|--------|------|------|
| **V1** | `TO anon, authenticated` | Simple, single policy | Sometimes unreliable in Supabase |
| **V2** | `TO public` | Very permissive, always works | Less explicit about who can access |
| **V3** | Separate policies for `anon` and `authenticated` | Most explicit, clearest intent | Two policies instead of one |

---

## Recommendation

**Version 3 (Current)** is the best approach because:
- ✅ Most explicit - clearly shows who can do what
- ✅ Most reliable - separate policies are easier to debug
- ✅ Better for security - can modify each role's permissions independently
- ✅ Easier to troubleshoot - can see exactly which policy applies

---

## Quick Reference: Policy Types

### INSERT Policies (Who can create submissions)
- `anon_insert_policy` → Anonymous users (public)
- `authenticated_insert_policy` → Logged-in users

### SELECT Policies (Who can view submissions)
- `anon_select_policy` → Anonymous users can only see approved
- `authenticated_select_policy` → Logged-in users can see all

### UPDATE Policy (Who can modify submissions)
- `admin_update_policy` → Only your admin user ID

### DELETE Policy (Who can delete submissions)
- `deny_delete_policy` → No one (archived, not deleted)

---

## Files Reference

- **`database/schema.sql`** - Main schema file (current version)
- **`database/fix-rls-policy.sql`** - Quick fix script (Version 2 approach)
- **`database/diagnostic-queries.sql`** - Queries to troubleshoot policies
