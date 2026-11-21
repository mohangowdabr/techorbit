-- TechOrbit Complete Seed Data for PostgreSQL / Supabase
INSERT INTO public.categories (id, name, slug, description, icon, color) VALUES
('hackathons', 'Hackathons', 'hackathons', 'High-impact 24-72h build sprints with top mentors & prizes', 'Code2', 'indigo'),
('competitions', 'Coding Competitions', 'competitions', 'Algorithmic, ICPC-style, and data structure tournaments', 'Trophy', 'amber'),
('internships', 'Internships & Fellowships', 'internships', 'Summer, off-cycle and research industry placements', 'Briefcase', 'emerald'),
('open-source', 'Open Source Programs', 'open-source', 'GSoC, LFX, Hacktoberfest, and paid OSS contributions', 'GitPullRequest', 'violet'),
('conferences', 'Conferences & Summits', 'conferences', 'Premier global tech summits with student grants & CFPs', 'Calendar', 'blue'),
('workshops', 'Workshops & Bootcamps', 'workshops', 'Hands-on accelerated masterclasses by industry pioneers', 'BookOpen', 'rose'),
('fellowships', 'Research Fellowships', 'fellowships', 'Academic and industry deep-tech scientific research', 'GraduationCap', 'teal'),
('cybersecurity', 'Cybersecurity & CTF', 'cybersecurity', 'Capture the Flag challenges, vulnerability research & pentesting', 'ShieldAlert', 'red')
ON CONFLICT (id) DO NOTHING;

-- Seed Opportunities
INSERT INTO public.opportunities (
  id, title, slug, category_id, organizer_name, tagline, description, format, cost, prize_pool, deadline, application_url, skills, source_type, verification_status, freshness_status
) VALUES
(
  'a0000000-0000-0000-0000-000000000001',
  'Global AI Agents Hackathon 2026',
  'global-ai-agents-hackathon-2026',
  'hackathons',
  'TechOrbit Labs & Anthropic',
  'Build autonomous agent workflows with real-world impact and production-grade tool use.',
  'The Global AI Agents Hackathon gathers 5,000+ developers, researchers, and creators worldwide. Participants will build production-grade agentic workflows, multi-agent swarms, and tool-augmented LLM systems.',
  'online',
  'free',
  '$75,000 USD',
  '2026-12-15 23:59:59+00',
  'https://techorbit.dev/apply/ai-agents-2026',
  ARRAY['TypeScript', 'Python', 'LLMs', 'Next.js', 'LangChain', 'Supabase'],
  'official_source',
  'verified',
  'recently_checked'
),
(
  'a0000000-0000-0000-0000-000000000002',
  'Google Summer of Code 2027',
  'google-summer-of-code-2027',
  'open-source',
  'Google Open Source Programs Office',
  'A global, online program focused on bringing new contributors into open source software development.',
  'Google Summer of Code is a global, online mentoring program designed to welcome new contributors into open source software development. GSoC contributors work with an open source organization on a 12+ week programming project under the guidance of mentors.',
  'online',
  'scholarship',
  '$3,000 - $6,000 Stipend',
  '2027-03-31 18:00:00+00',
  'https://summerofcode.withgoogle.com',
  ARRAY['Git', 'C++', 'Python', 'Rust', 'Go', 'Linux'],
  'official_source',
  'verified',
  'recently_checked'
),
(
  'a0000000-0000-0000-0000-000000000003',
  'ETHGlobal Bangkok & World Finals 2026',
  'ethglobal-bangkok-2026',
  'hackathons',
  'ETHGlobal & Ethereum Foundation',
  'The world leading Web3 hackathon with 1,500 builders, verifiable credentials & smart accounts.',
  'Join developers, cryptographers, and protocol designers in Bangkok for 36 hours of building decentralized applications, zero-knowledge proofs, and account abstraction infrastructure.',
  'hybrid',
  'free',
  '$125,000 USD',
  '2026-12-01 23:59:59+00',
  'https://ethglobal.com/events/bangkok2026',
  ARRAY['Solidity', 'TypeScript', 'Rust', 'Zero Knowledge', 'Next.js'],
  'official_source',
  'verified',
  'recently_checked'
),
(
  'a0000000-0000-0000-0000-000000000004',
  'OpenAI Research Residency 2027',
  'openai-research-residency-2027',
  'fellowships',
  'OpenAI',
  '6-month paid full-time transition into frontier artificial intelligence research.',
  'Designed for researchers and engineers transitioning into deep learning from outside machine learning, such as mathematics, physics, or systems engineering. Work with leading researchers on frontier AI safety, reasoning, and scaling.',
  'in-person',
  'scholarship',
  '$210,000 Annualized Salary',
  '2027-01-10 23:59:59+00',
  'https://openai.com/careers/residency',
  ARRAY['Python', 'PyTorch', 'Calculus', 'Linear Algebra', 'Distributed Computing'],
  'official_source',
  'verified',
  'recently_checked'
)
ON CONFLICT (id) DO NOTHING;
