-- ==============================================================================
-- TechOrbit Complete PostgreSQL Schema with Row Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    headline TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'developer', 'organizer', 'admin')),
    bio TEXT,
    location TEXT,
    github_handle TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    privacy_level TEXT NOT NULL DEFAULT 'public' CHECK (privacy_level IN ('public', 'private', 'connections')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT
);

-- Opportunities
CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id TEXT REFERENCES public.categories(id),
    organizer_name TEXT NOT NULL,
    organizer_id UUID REFERENCES public.profiles(id),
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    format TEXT NOT NULL CHECK (format IN ('online', 'in-person', 'hybrid')),
    location TEXT,
    cost TEXT NOT NULL DEFAULT 'free' CHECK (cost IN ('free', 'paid', 'scholarship')),
    prize_pool TEXT,
    deadline TIMESTAMPTZ NOT NULL,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    application_url TEXT NOT NULL,
    banner_url TEXT,
    logo_url TEXT,
    eligibility TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    source_type TEXT NOT NULL DEFAULT 'organizer_submitted' CHECK (source_type IN ('official_source', 'organizer_submitted', 'community_submitted')),
    verification_status TEXT NOT NULL DEFAULT 'pending_review' CHECK (verification_status IN ('verified', 'pending_review', 'rejected', 'community_unverified')),
    freshness_status TEXT NOT NULL DEFAULT 'recently_checked' CHECK (freshness_status IN ('recently_checked', 'needs_recheck', 'expired')),
    source_url TEXT,
    last_checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_live_event BOOLEAN NOT NULL DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Applications / User Activities
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'saved' CHECK (status IN ('saved', 'interested', 'applied', 'shortlisted', 'accepted', 'participating', 'completed', 'rejected', 'withdrawn')),
    is_organizer_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    deadline_reminder_set BOOLEAN DEFAULT TRUE,
    applied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, opportunity_id)
);

-- Teams (TeamMatch)
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    leader_id UUID NOT NULL REFERENCES public.profiles(id),
    max_members INTEGER NOT NULL DEFAULT 4,
    looking_for_skills TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'recruiting' CHECK (status IN ('recruiting', 'full', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Team Members
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('leader', 'member')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(team_id, user_id)
);

-- Projects (Passport)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    demo_url TEXT,
    github_url TEXT,
    technologies TEXT[] DEFAULT '{}',
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Achievements
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    event_name TEXT NOT NULL,
    award_title TEXT NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_hash TEXT,
    issued_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Moderation Logs
CREATE TABLE IF NOT EXISTS public.moderation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
    moderator_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Enablement
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
CREATE POLICY "Public profiles are readable by everyone" ON public.profiles FOR SELECT USING (privacy_level = 'public');
CREATE POLICY "Public opportunities are readable by everyone" ON public.opportunities FOR SELECT USING (verification_status = 'verified' OR verification_status = 'pending_review');
CREATE POLICY "Users can manage their own applications" ON public.applications FOR ALL USING (auth.uid() = user_id);
