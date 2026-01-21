---
description: comprehensive maintenance workflow for Canary
---

# Maintaining Canary

Follow these steps to ensure the Canary platform is updated and operational.

1. **Verify Data Ingestion**
   - Run the ingestion tool to fetch latest PubMed records.
   // turbo
   `npm run ingest`
   - Check the logs for any "Ingestion failed" messages.

2. **Validate Demo Snapshots**
   - Ensure `public/data/demo/evidence.json` and `public/data/demo/risks.json` have been updated with latest timestamps.
   - If in Cloud Storage mode, verify S3 connectivity.

3. **Check Build Status**
   - Run a production build to catch any TypeScript or bundling errors.
   // turbo
   `npm run build`

4. **Review Operational Briefs**
   - Start the dev server: `npm run dev`.
   - Navigate to the Dashboard and verify the "Daily Brief" section reflects the latest ingested evidence.

5. **Deploy Updates**
   - Push changes to GitHub: `git add . && git commit -m "chore: maintenance update" && git push origin main`.
   - If Netlify MCP is connected, monitor the deploy status.

6. **Cleanup**
   - Clear any stale build artifacts: `rm -rf dist`.
