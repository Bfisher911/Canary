import { EvidenceItem } from '../types';

export interface StorageAdapter {
    saveEvidence(items: EvidenceItem[]): Promise<void>;
    listEvidence(filter?: Partial<EvidenceItem>): Promise<EvidenceItem[]>;
    getEvidenceById(id: string): Promise<EvidenceItem | null>;
}

export class LocalFileAdapter implements StorageAdapter {
    private dataDir: string;

    constructor() {
        this.dataDir = '/data/demo';
    }

    async saveEvidence(items: EvidenceItem[]): Promise<void> {
        console.log(`[LocalFileAdapter] Simulated save of ${items.length} items to ${this.dataDir}`);
        // In a real environment, this might write to a local JSON file or a lightweight DB
    }

    async listEvidence(filter?: Partial<EvidenceItem>): Promise<EvidenceItem[]> {
        // This will be replaced by actual fetching from public/data/demo/evidence.json
        return [];
    }

    async getEvidenceById(id: string): Promise<EvidenceItem | null> {
        return null;
    }
}

export class CloudStorageAdapter implements StorageAdapter {
    async saveEvidence(items: EvidenceItem[]): Promise<void> {
        if (!process.env.S3_BUCKET) {
            console.warn('[CloudStorageAdapter] S3_BUCKET not configured. Skipping save.');
            return;
        }
        console.log(`[CloudStorageAdapter] Saving ${items.length} items to S3...`);
    }

    async listEvidence(filter?: Partial<EvidenceItem>): Promise<EvidenceItem[]> {
        return [];
    }

    async getEvidenceById(id: string): Promise<EvidenceItem | null> {
        return null;
    }
}
