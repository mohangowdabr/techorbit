# TechOrbit Security & Access Control

## 1. Authentication & Session Management
- Next.js server-side cookie verification.
- Supabase Auth supporting Email/Password and OAuth providers.
- Role-based authorization: `student`, `developer`, `organizer`, `admin`.

## 2. Row Level Security (RLS) Policy Matrix
- **opportunities**: 
  - `SELECT`: Publicly readable if `status = 'published'` or user is organizer/admin.
  - `INSERT/UPDATE`: Authenticated users with role `organizer` or `admin`.
- **applications / user_activities**:
  - `SELECT/INSERT/UPDATE`: `auth.uid() = user_id`.
- **teams & invitations**:
  - `SELECT`: Public for open teams, restricted for invite-only.
  - `INSERT/UPDATE`: Team leaders and designated members.
- **passport profiles**:
  - `SELECT`: Public if `privacy_level = 'public'`; owner only if `private`.
- **moderation_logs & data_sources**:
  - Admin only (`profiles.role = 'admin'`).

## 3. Secret Protection
- Zero client leakage: `SUPABASE_SERVICE_ROLE_KEY` and API credentials are kept strictly in server-side Next.js route handlers and server services.
- User input sanitization on all markdown, URLs, and submission bodies.
