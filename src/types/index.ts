export type HazardFamily =
    | 'heat'
    | 'flooding'
    | 'respiratory'
    | 'water_quality'
    | 'vector_borne'
    | 'wildfire_smoke'
    | 'infrastructure'
    | 'general';

export interface EvidenceItem {
    id: string;
    title: string;
    authors: string[];
    journal?: string;
    year: number;
    pubDate: string;
    doi?: string;
    pmid?: string;
    abstract: string;
    url: string;
    tags: string[];
    hazardFamily: HazardFamily;
    populationFocus: string[];
    geography: string[];
    addedAt: string;
    source: string;
    whyCanaryCares?: string;
}

export interface SignalSnapshot {
    id: string;
    source: string;
    measuredAt: string;
    geography: string;
    metrics: Record<string, number | string>;
    confidence: number;
}

export interface RiskFinding {
    id: string;
    createdAt: string;
    geography: string;
    hazardFamily: HazardFamily;
    score: number; // 0 to 100
    confidence: number; // 0 to 1
    rationaleBullets: string[];
    supportingEvidenceIds: string[];
}

export interface VulnerabilityRow {
    geographyUnit: string;
    hazardFamily: HazardFamily;
    factorScores: Record<string, number>;
    compositeScore: number;
    notes: string;
}

export interface OperationalBrief {
    id: string;
    date: string;
    geography: string;
    summary: string;
    keyHazards: RiskFinding[];
    recentEvidence: EvidenceItem[];
    recommendations: string[];
}
