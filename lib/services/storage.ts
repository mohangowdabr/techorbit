import { Opportunity, Team, UserActivity, DeveloperProfile, ApplicationStatus } from '../types';
import { INITIAL_OPPORTUNITIES, INITIAL_TEAMS, CURRENT_USER_PROFILE, INITIAL_USER_ACTIVITIES } from '../data/mock-data';

// Persistent Client/Server Storage Manager for TechOrbit
class TechOrbitStorageService {
  private opportunities: Opportunity[] = [...INITIAL_OPPORTUNITIES];
  private teams: Team[] = [...INITIAL_TEAMS];
  private activities: UserActivity[] = [...INITIAL_USER_ACTIVITIES];
  private profile: DeveloperProfile = { ...CURRENT_USER_PROFILE };
  private moderationQueue: Opportunity[] = [];

  constructor() {
    // Initialize in-memory state
  }

  // --- Opportunities ---
  public getOpportunities(): Opportunity[] {
    return this.opportunities;
  }

  public getOpportunityBySlug(slug: string): Opportunity | undefined {
    return this.opportunities.find((o) => o.slug === slug || o.id === slug);
  }

  public addOpportunity(opportunity: Opportunity): Opportunity {
    this.opportunities.unshift(opportunity);
    return opportunity;
  }

  public updateOpportunity(id: string, updates: Partial<Opportunity>): Opportunity | null {
    const idx = this.opportunities.findIndex(o => o.id === id);
    if (idx === -1) return null;
    this.opportunities[idx] = { ...this.opportunities[idx], ...updates, lastCheckedAt: new Date().toISOString() };
    return this.opportunities[idx];
  }

  // --- Activities / Application Tracker ---
  public getUserActivities(userId: string = "user-dev-current"): UserActivity[] {
    return this.activities.filter(a => a.userId === userId);
  }

  public setActivityStatus(
    opportunityId: string, 
    status: ApplicationStatus, 
    notes?: string,
    isOrganizerConfirmed: boolean = false
  ): UserActivity {
    const existingIdx = this.activities.findIndex(
      a => a.opportunityId === opportunityId && a.userId === "user-dev-current"
    );

    const now = new Date().toISOString();

    if (existingIdx >= 0) {
      this.activities[existingIdx] = {
        ...this.activities[existingIdx],
        status,
        notes: notes !== undefined ? notes : this.activities[existingIdx].notes,
        isOrganizerConfirmed,
        updatedAt: now,
        appliedAt: status === 'applied' && !this.activities[existingIdx].appliedAt ? now : this.activities[existingIdx].appliedAt
      };
      return this.activities[existingIdx];
    } else {
      const newActivity: UserActivity = {
        id: `act-${Date.now()}`,
        opportunityId,
        userId: "user-dev-current",
        status,
        isOrganizerConfirmed,
        notes: notes || "",
        deadlineReminderSet: true,
        appliedAt: status === 'applied' ? now : undefined,
        updatedAt: now
      };
      this.activities.unshift(newActivity);
      return newActivity;
    }
  }

  public removeActivity(opportunityId: string): void {
    this.activities = this.activities.filter(
      a => !(a.opportunityId === opportunityId && a.userId === "user-dev-current")
    );
  }

  // --- Teams / TeamMatch ---
  public getTeams(): Team[] {
    return this.teams;
  }

  public getTeamById(id: string): Team | undefined {
    return this.teams.find(t => t.id === id || t.slug === id);
  }

  public createTeam(team: Team): Team {
    this.teams.unshift(team);
    return team;
  }

  public joinTeam(teamId: string, member: { id: string; name: string; avatar: string; skills: string[]; githubHandle?: string }): boolean {
    const team = this.teams.find(t => t.id === teamId);
    if (!team || team.members.length >= team.maxMembers) return false;
    
    if (team.members.some(m => m.id === member.id)) return true; // Already member

    team.members.push({
      ...member,
      role: 'member'
    });

    if (team.members.length >= team.maxMembers) {
      team.status = 'full';
    }

    return true;
  }

  // --- Developer Passport ---
  public getProfile(): DeveloperProfile {
    return this.profile;
  }

  public updateProfile(updates: Partial<DeveloperProfile>): DeveloperProfile {
    this.profile = { ...this.profile, ...updates };
    return this.profile;
  }

  // --- Moderation & Verification Engine ---
  public getModerationQueue(): Opportunity[] {
    return this.opportunities.filter(o => o.verificationStatus === 'pending_review');
  }

  public approveOpportunity(id: string): boolean {
    const opp = this.opportunities.find(o => o.id === id);
    if (!opp) return false;
    opp.verificationStatus = 'verified';
    opp.lastCheckedAt = new Date().toISOString();
    return true;
  }

  public rejectOpportunity(id: string): boolean {
    const opp = this.opportunities.find(o => o.id === id);
    if (!opp) return false;
    opp.verificationStatus = 'rejected';
    return true;
  }
}

// Singleton storage instance
export const storageService = new TechOrbitStorageService();
