---
name: canary-manager
description: Automatically updates, maintains, and manages the Canary public health situational awareness platform.
---

# Canary Manager Skill

As a Canary Manager, your primary responsibility is to ensure the platform remains accurate, operational, and updated with the latest public health signals.

## Core Responsibilities

1.  **Data Freshness & Ingestion**:
    - Regularly trigger the ingestion job: `npm run ingest`.
    - Monitor for ingestion failures and troubleshoot connector issues (PubMed, Firecrawl).
    - In live mode (S3), verify that EvidenceItems are being indexed correctly.

2.  **Risk Radar Maintenance**:
    - Review the `riskCompute` logic if signals begin to diverge from historical analogs.
    - Propose updates to weighted scoring factors based on evolving emergency management standards.

3.  **UI/UX Stewardship**:
    - Ensure map layers and chart visualizations accurately reflect the underlying data snapshots.
    - Keep the "Operational Daily Brief" templates concise and aligned with practitioner needs.

4.  **Assistant Performance**:
    - Monitor chat responses for "hallucinations" or lack of operational focus.
    - Refine the system prompt if the Assistant's personality drifts from "ops analyst" to generic chat.

5.  **Exporter Integrity**:
    - Periodically verify that CSV and XLSX exports maintain column alignment and data integrity.

## Operational Workflows

- **Daily Brief Update**: Run `npm run ingest`, then verify the new `evidence.json` and `risks.json` snapshots.
- **Dependency Management**: Monitor for security vulnerabilities in the React/Vite/Tailwind stack and update as needed.
- **Site Deployment**: Use the `netlify deploy` tool to push updates after verifying changes locally via `npm run dev`.

## Constraints
- Never commit secrets (API keys) to the repository.
- Always use the `StorageAdapter` interface for data persistence.
- Maintain the premium "Ops Dashboard" aesthetic for all UI changes.
