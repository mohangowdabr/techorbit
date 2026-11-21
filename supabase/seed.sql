-- TechOrbit Seed Data for Seed/Demo Environment
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
