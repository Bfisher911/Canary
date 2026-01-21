import { PubMedConnector } from '../lib/ingest';
import { LocalFileAdapter, CloudStorageAdapter } from '../lib/storage';

const topics = [
    'public health emergency preparedness',
    'disaster preparedness',
    'disaster resilience',
    'emergency management',
    'incident command',
    'syndromic surveillance',
    'One Health',
    'climate health',
    'heat morbidity',
    'flood health impacts',
    'wildfire smoke',
    'waterborne disease',
    'vector borne disease',
    'hospital surge',
    'continuity of operations'
];

async function main() {
    console.log('--- Canary Ingestion Job Starting ---');

    const ingest = new PubMedConnector();
    const storage = process.env.S3_BUCKET ? new CloudStorageAdapter() : new LocalFileAdapter();

    try {
        const items = await ingest.fetchRecent(topics, 1);
        console.log(`Found ${items.length} new items.`);

        if (items.length > 0) {
            await storage.saveEvidence(items);
            console.log('Successfully stored new evidence.');
        }
    } catch (error) {
        console.error('Ingestion failed:', error);
        process.exit(1);
    }

    console.log('--- Canary Ingestion Job Finished ---');
}

main();
