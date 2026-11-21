# TechOrbit Verification & Testing Guide

## Automated Test Suite
Run the test suite with:
```bash
npm test
```

### Covered Test Domains:
1. **Opportunity Filtering & Discovery**: Verifies category, search, format, and cost filtering logic.
2. **Provenance & Verification Flags**: Confirms that every record properly maintains source, verification, and freshness status.
3. **Application Tracking State Machine**: Tests transitions between saved, applied, accepted, and completed stages.
4. **TeamMatch Formation**: Tests team invitations, member joins, and role assignments.
5. **Developer Passport Data Integrity**: Tests privacy settings and verified vs self-reported achievement separation.
6. **Intelligence & Eligibility Engine**: Validates eligibility criteria calculation and recommendation scoring.
7. **Ingestion & Deduplication**: Verifies duplicate detection and hash calculation.
