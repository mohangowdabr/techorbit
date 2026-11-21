export type OpportunityCategory = 
  | 'hackathons'
  | 'competitions'
  | 'internships'
  | 'open-source'
  | 'conferences'
  | 'workshops'
  | 'fellowships'
  | 'cybersecurity'
  | 'bootcamps'
  | 'research';

export type OpportunityFormat = 'online' | 'in-person' | 'hybrid';
export type OpportunityCost = 'free' | 'paid' | 'scholarship';
export type SourceType = 'official_source' | 'organizer_submitted' | 'community_submitted';
export type VerificationStatus = 'verified' | 'pending_review' | 'rejected' | 'community_unverified';
export type FreshnessStatus = 'recently_checked' | 'needs_recheck' | 'expired';

export interface Opportunity {
  id: string;
  title: string;
  slug: string;
  category: OpportunityCategory;
  categoryName: string;
  organizer: string;
  organizerId?: string;
  tagline: string;
  description: string;
  format: OpportunityFormat;
  location?: string;
  cost: OpportunityCost;
  prizePool?: string;
  deadline: string;
  startDate?: string;
  endDate?: string;
  applicationUrl: string;
  bannerUrl?: string;
  logoUrl?: string;
  eligibility: string[];
  skills: string[];
  sourceType: SourceType;
  verificationStatus: VerificationStatus;
  freshnessStatus: FreshnessStatus;
  sourceUrl?: string;
  lastCheckedAt: string;
  isLiveEvent?: boolean;
  participantCount?: number;
  featured?: boolean;
}

export type ApplicationStatus = 
  | 'saved'
  | 'interested'
  | 'applied'
  | 'shortlisted'
  | 'accepted'
  | 'participating'
  | 'completed'
  | 'rejected'
  | 'withdrawn';

export interface UserActivity {
  id: string;
  opportunityId: string;
  userId: string;
  status: ApplicationStatus;
  isOrganizerConfirmed: boolean;
  notes?: string;
  deadlineReminderSet: boolean;
  appliedAt?: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: 'leader' | 'member';
  skills: string[];
  githubHandle?: string;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  opportunityId: string;
  opportunityTitle: string;
  description: string;
  leaderId: string;
  members: TeamMember[];
  maxMembers: number;
  lookingForSkills: string[];
  status: 'recruiting' | 'full' | 'closed';
  createdAt: string;
}

export interface DeveloperProfile {
  id: string;
  fullName: string;
  headline: string;
  avatarUrl: string;
  role: 'student' | 'developer' | 'organizer' | 'admin';
  bio: string;
  location: string;
  githubHandle: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  privacyLevel: 'public' | 'private' | 'connections';
  skills: { name: string; level: 'beginner' | 'intermediate' | 'advanced' | 'expert' }[];
  projects: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    demoUrl?: string;
    githubUrl?: string;
  }[];
  achievements: {
    id: string;
    title: string;
    eventName: string;
    isVerified: boolean;
    verificationHash?: string;
    issuedDate: string;
  }[];
}
