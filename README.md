# TechOrbit — Every Opportunity. One Ecosystem.

TechOrbit is a participant-first technology opportunity ecosystem built with **Next.js App Router**, **React 18**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL with RLS)**.

It connects the entire developer journey:
**Discover → Evaluate → Apply → Connect → Participate → Submit → Showcase → Grow**

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Automated Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🏛️ Architecture & Divisions

1. **TechOrbit Discover (Opportunity Radar)** (`/discover`, `/opportunities/[slug]`):
   - Multi-faceted filters (Category, Format, Cost, Skills).
   - Provenance Triad: Source Origin, Verification Status, and Freshness.
   - Verified canonical application destinations.

2. **TechOrbit Community & TeamMatch** (`/teams`):
   - Teammate discovery, recruiting rosters, skill matching, and team creation.

3. **Participant Dashboard (My Activities)** (`/dashboard`):
   - 9-stage pipeline (`saved`, `interested`, `applied`, `shortlisted`, `accepted`, `participating`, `completed`, `rejected`, `withdrawn`).
   - Clear distinction between **Organizer Confirmed** and **Self-Reported** progress.
   - Personal progress notes and deadline reminders.

4. **TechOrbit Passport** (`/passport`):
   - Verifiable credentials and achievements with cryptographic hash references.
   - Showcase projects with live demo and repository links.
   - Evaluated skill matrix and public/private privacy controls.

5. **TechOrbit Live** (`/live`):
   - Direct online challenge workspace, project submissions with repository URLs, criteria-based judging scorecards, and live leaderboards.

6. **Organizer Hub** (`/organizer`):
   - Event creation wizard, submission tracking, views, and attendee analytics.

7. **Data Health & Moderation** (`/admin`):
   - Ingestion sync audit logs (GitHub API, RSS feeds, organizer submissions).
   - Verification review gate (Approve/Reject) and deduplication telemetry.

8. **TechOrbit Intelligence Copilot**:
   - Natural language search parser and personalized profile matchmaker with skill-gap recommendations.

---

## 🗄️ Database & Schema

Supabase migrations and seed scripts are located in:
- `supabase/migrations/20260101000000_techorbit_schema.sql` (Complete schema with Row Level Security)
- `supabase/seed.sql` (Initial canonical categories and opportunities)

Configure your Supabase keys in `.env` (optional, falls back gracefully to in-memory reactive state):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 📚 Complete Project Documentation
- [Roadmap](file:///c:/Users/mohan/Downloads/Techorbit/docs/ROADMAP.md)
- [Architecture](file:///c:/Users/mohan/Downloads/Techorbit/docs/ARCHITECTURE.md)
- [Database](file:///c:/Users/mohan/Downloads/Techorbit/docs/DATABASE.md)
- [Integrations](file:///c:/Users/mohan/Downloads/Techorbit/docs/INTEGRATIONS.md)
- [Security](file:///c:/Users/mohan/Downloads/Techorbit/docs/SECURITY.md)
- [Development Status](file:///c:/Users/mohan/Downloads/Techorbit/docs/DEVELOPMENT_STATUS.md)
- [Testing & Verification](file:///c:/Users/mohan/Downloads/Techorbit/docs/TESTING.md)

---

## 🪐 Orbital Motion Design System (`components/motion/`)

The Developer Passport (`/passport`) features a living orbital design system centered around the brand concept *"Every Opportunity. One Ecosystem."* The developer is the central sun, while skills, achievements, and attestations orbit around them.

### Reusable Motion Components
- **`StarField`** (`components/motion/StarField.tsx`): High-performance canvas-based particle field with subtle mouse parallax and twinkle effects. Automatically respects `prefers-reduced-motion` and scales down on touch devices.
- **`TiltCard`** (`components/motion/TiltCard.tsx`): 3D perspective spring tilt physics card (`rotateX`, `rotateY`) with a cursor-following spotlight gradient overlay.
- **`MagneticLink`** (`components/motion/MagneticLink.tsx`): Magnetic pull interaction where link icons gently follow cursor proximity, paired with an animated gradient underline draw.
- **`ScrambleText`** (`components/motion/ScrambleText.tsx`): Cryptographic verification hash decryptor that scrambles on hover, resolves into the authentic hash, and copies to clipboard on click.
- **`OrbitSkills`** (`components/motion/OrbitSkills.tsx`): Interactive dual-mode component with view toggle:
  - *Matrix View*: Floating bobbing skill chips with animated fill meters and dimmed focus states.
  - *Orbit View*: Skills placed on concentric celestial rings (Inner = Expert, Mid = Advanced, Outer = Intermediate) rotating around the developer sun core.
- **`AnimatedCounter`** (`components/motion/AnimatedCounter.tsx`): Smooth numerical stat reveal (`3 Confirmed`, `8 Evaluated`).
- **`ScrollProgressBar`** (`components/motion/ScrollProgressBar.tsx`): Top gradient progress line tied to window scroll.
- **`CustomCursor`** (`components/motion/CustomCursor.tsx`): Smooth trailing glow halo and precision dot that scales up over buttons, links, and inputs. Suppressed on mobile/touch pointers.
- **`OrbitalLoader`** (`components/motion/OrbitalLoader.tsx`): Celestial startup sequence with rotating orbital rings and central spark.
- **`ShareToast`** (`components/motion/ShareToast.tsx`): Confetti-accompanied bottom toast notification triggered on link sharing.

### Motion Toggles & Accessibility
- **Reduced Motion**: All animations automatically query `window.matchMedia('(prefers-reduced-motion: reduce)')`. When active, particle fields, tilts, and complex rotational transforms are bypassed.
- **Touch & Mobile Optimization**: Heavy cursor tracking and tilt physics are automatically disabled when `pointer: coarse` is detected.
