import { Opportunity, DeveloperProfile } from '../types';

export interface MatchResult {
  score: number; // 0 to 100
  matchedSkills: string[];
  missingSkills: string[];
  eligibilityPassed: boolean;
  explanation: string;
}

export class IntelligenceEngine {
  /**
   * Evaluates match quality between developer profile and opportunity
   */
  public static calculateMatch(profile: DeveloperProfile, opp: Opportunity): MatchResult {
    const userSkillNames = new Set(profile.skills.map(s => s.name.toLowerCase()));
    const oppSkills = opp.skills.map(s => s.toLowerCase());

    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    oppSkills.forEach(skill => {
      if (userSkillNames.has(skill)) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });

    // Skill coverage calculation
    const skillRatio = oppSkills.length > 0 ? (matchedSkills.length / oppSkills.length) : 1;
    
    // Category affinity
    let baseScore = Math.round(skillRatio * 70);

    // Profile role alignment bonus
    if (opp.category === 'hackathons' || opp.category === 'open-source') {
      baseScore += 15;
    }
    if (opp.verificationStatus === 'verified') {
      baseScore += 10;
    }
    if (opp.freshnessStatus === 'recently_checked') {
      baseScore += 5;
    }

    const finalScore = Math.min(Math.max(baseScore, 10), 98);

    const explanation = matchedSkills.length > 0 
      ? `High alignment in ${matchedSkills.slice(0, 3).join(', ')}. ${missingSkills.length > 0 ? `Consider learning ${missingSkills.slice(0, 2).join(', ')} to maximize your edge.` : 'Full skill synergy.'}`
      : `Opportunity matches your interest area. Developing skills in ${oppSkills.slice(0, 2).join(', ')} is recommended.`;

    return {
      score: finalScore,
      matchedSkills,
      missingSkills,
      eligibilityPassed: true,
      explanation
    };
  }

  /**
   * Natural Language Query Intent Parser
   */
  public static parseNaturalQuery(query: string): {
    category?: string;
    format?: string;
    skills: string[];
    freeOnly: boolean;
  } {
    const lower = query.toLowerCase();
    let category: string | undefined = undefined;

    if (lower.includes('hackathon')) category = 'hackathons';
    else if (lower.includes('intern') || lower.includes('job')) category = 'internships';
    else if (lower.includes('open source') || lower.includes('gsoc')) category = 'open-source';
    else if (lower.includes('competition') || lower.includes('contest') || lower.includes('icpc')) category = 'competitions';
    else if (lower.includes('research') || lower.includes('fellowship')) category = 'fellowships';
    else if (lower.includes('ctf') || lower.includes('security') || lower.includes('cyber')) category = 'cybersecurity';

    const format = lower.includes('remote') || lower.includes('online') ? 'online' : undefined;
    const freeOnly = lower.includes('free') || lower.includes('no cost');

    const knownSkills = ['python', 'typescript', 'rust', 'c++', 'go', 'react', 'next.js', 'ai', 'llm', 'ml'];
    const detectedSkills = knownSkills.filter(s => lower.includes(s));

    return { category, format, skills: detectedSkills, freeOnly };
  }
}
