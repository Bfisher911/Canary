import { EvidenceItem } from '../types';

export interface DocumentIngestAdapter {
    fetchRecent(topics: string[], daysBack: number): Promise<EvidenceItem[]>;
}

export class PubMedConnector implements DocumentIngestAdapter {
    private baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';

    async fetchRecent(topics: string[], daysBack: number): Promise<EvidenceItem[]> {
        console.log(`[PubMedConnector] Fetching items for topics: ${topics.join(', ')} for the last ${daysBack} days`);
        // Implementation for NCBI E-utilities goes here
        return [];
    }
}

export class FirecrawlConnector implements DocumentIngestAdapter {
    async fetchRecent(topics: string[], daysBack: number): Promise<EvidenceItem[]> {
        if (!process.env.FIRECRAWL_API_KEY) {
            console.warn('[FirecrawlConnector] FIRECRAWL_API_KEY not configured.');
            return [];
        }
        console.log(`[FirecrawlConnector] Crawling agency pages for ${topics.join(', ')}`);
        return [];
    }
}
