# TechOrbit External Integrations Guide

## 1. Supported Adapters & Integration Points

### 1.1 Ingestion Adapter Architecture
```typescript
interface DataAdapter {
  sourceId: string;
  sourceName: string;
  fetchNewRecords(): Promise<RawOpportunityRecord[]>;
  normalize(raw: RawOpportunityRecord): NormalizedOpportunity;
  validate(record: NormalizedOpportunity): ValidationResult;
}
```

### 1.2 Registered Ingestion Sources
1. **Organizer Submissions**: Direct web portal submissions validated by schema and staged in `pending_review` until moderator approval.
2. **RSS / Atom Feed Engine**: Ingests technology conference feeds, hackathon alerts, and open-source fellowship announcements.
3. **GitHub Open Source Adapter**: Pulls program and repository grant opportunities (e.g., GSoC, GitHub Octernships, Open Source Fellowship repos) via official GitHub REST API endpoints.

## 2. Ingestion Pipeline Lifecycle
1. Fetch -> 2. Schema Validation -> 3. Deduplication (hash on title + organizer + year) -> 4. Source Provenance Tagging -> 5. Moderation Queue -> 6. Production Publish & Realtime Broadcast.

## 3. Freshness & Expiry Strategy
- Automated job checks records against `deadline`.
- Opportunities past deadline automatically transition to `freshness: expired`.
- Organizers receive 7-day and 48-hour expiration reminder alerts.
