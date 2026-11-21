# TechOrbit Database Schema & Domain Model

## 1. Domains and Tables

### Identity & Profiles
- `profiles`: Core user records extending Supabase auth. Users have roles (`student`, `developer`, `organizer`, `admin`).
- `user_skills`: Normalized skill associations with proficiency levels (`beginner`, `intermediate`, `advanced`, `expert`).
- `user_preferences`: Notification, opportunity category, and privacy settings.
- `user_links`: External profiles (GitHub, LinkedIn, Portfolio, Devpost, etc.).

### Opportunities & Discover
- `categories`: Canonical opportunity types (Hackathons, Coding Competitions, Internships, Open-Source, Fellowships, Conferences, Workshops, Bootcamps, Research, Startup Challenges, Cybersecurity).
- `opportunities`: Core opportunity table with deadline, prize pool, format, eligibility, verification state, freshness timestamp, and source provenance.
- `opportunity_skills`: Required and recommended skills for an opportunity.
- `opportunity_updates`: Announcements, deadline extensions, and organizer notes.

### Participation & Activities
- `applications`: User participation pipeline (`saved`, `interested`, `applied`, `shortlisted`, `accepted`, `participating`, `completed`, `rejected`, `withdrawn`). Includes `is_organizer_confirmed` flag.
- `submissions`: Project submissions for TechOrbit-hosted live challenges.
- `judging_scores`: Scorecards, criteria evaluations, and judge comments.

### Teams & Community (TeamMatch)
- `teams`: Formed teams linked optionally to an opportunity.
- `team_members`: Members and roles (`leader`, `member`).
- `team_invitations`: Outgoing and incoming collaboration requests.

### Developer Passport
- `projects`: Showcase projects with live URLs, GitHub repos, tech stack, and media.
- `achievements`: Badges and contest records (clearly separating organizer-verified vs user-claimed).
- `certificates`: Verified credentials, issued dates, and verification hashes.

### Sources, Ingestion & Moderation
- `data_sources`: Registered ingest adapters (GitHub API, Dev Feeds, Organizer Submissions).
- `source_sync_runs`: Audit log of sync executions, records processed, and errors.
- `moderation_logs`: Admin decisions, verification history, and user reports.
