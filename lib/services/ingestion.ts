import { Opportunity, SourceType, VerificationStatus } from '../types';

export interface IngestionLog {
  id: string;
  sourceName: string;
  sourceType: SourceType;
  itemsFetched: number;
  itemsNormalized: number;
  duplicatesSkipped: number;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  errorMessage?: string;
}

export class IngestionEngine {
  private static syncLogs: IngestionLog[] = [
    {
      id: "sync-1",
      sourceName: "GitHub Open Source Grants API",
      sourceType: "official_source",
      itemsFetched: 12,
      itemsNormalized: 12,
      duplicatesSkipped: 3,
      timestamp: "2026-11-21T08:00:00Z",
      status: "success"
    },
    {
      id: "sync-2",
      sourceName: "Tech Events RSS Feed Syndication",
      sourceType: "community_submitted",
      itemsFetched: 24,
      itemsNormalized: 22,
      duplicatesSkipped: 8,
      timestamp: "2026-11-20T18:30:00Z",
      status: "success"
    },
    {
      id: "sync-3",
      sourceName: "Direct Organizer Submission Gateway",
      sourceType: "organizer_submitted",
      itemsFetched: 6,
      itemsNormalized: 6,
      duplicatesSkipped: 0,
      timestamp: "2026-11-21T10:15:00Z",
      status: "success"
    }
  ];

  public static getSyncLogs(): IngestionLog[] {
    return this.syncLogs;
  }

  /**
   * Generates a deterministic deduplication hash for an opportunity
   */
  public static computeDeduplicationHash(title: string, organizer: string): string {
    const raw = `${title.trim().toLowerCase()}::${organizer.trim().toLowerCase()}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      const char = raw.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Normalizes incoming raw feeds into TechOrbit Opportunity standard
   */
  public static normalizeExternalRecord(raw: any, source: SourceType): Opportunity {
    const title = raw.title || "Untitled Opportunity";
    const organizer = raw.organizer || "Unknown Organizer";
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return {
      id: `ingest-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      slug: `${slug}-${Math.random().toString(36).substring(2, 5)}`,
      category: raw.category || 'hackathons',
      categoryName: raw.categoryName || 'Hackathons',
      organizer,
      tagline: raw.tagline || 'New opportunity imported via ingestion pipeline.',
      description: raw.description || raw.tagline || 'Full details available on official destination.',
      format: raw.format || 'online',
      cost: raw.cost || 'free',
      deadline: raw.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      applicationUrl: raw.applicationUrl || raw.sourceUrl || "https://techorbit.dev",
      eligibility: raw.eligibility || ["Open to developers worldwide"],
      skills: raw.skills || ["General Tech"],
      sourceType: source,
      verificationStatus: source === 'official_source' ? 'verified' : 'pending_review',
      freshnessStatus: 'recently_checked',
      sourceUrl: raw.sourceUrl,
      lastCheckedAt: new Date().toISOString()
    };
  }
}
