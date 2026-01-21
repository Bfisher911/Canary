# Canary 🦜

**Canary in the Coal Mine** is an operational situational awareness and decision support platform for public health preparedness, emergency management, and homeland security.

## Features
- **Operational Dashboard**: Real-time risk maps, trend timelines, and status indicators.
- **Guided Assessment Wizard**: Evidence-based workflow for generating site-specific vulnerability worksheets.
- **Evidence Library**: Automated ingestion of peer-reviewed literature and agency signals.
- **Canary Assistant**: An AI-powered "Ops Analyst" for translating evidence into actionable briefings.
- **Data Portability**: Export artifacts directly to CSV and XLSX.

## Architecture
```ascii
[ Public Health Sources ] --- (Daily Ingest) --- [ Storage Adapter ]
      (PubMed, etc.)                                     /
                                                        /
[ Netlify Functions ] <---------------------------------
      /chat
      /ingest
      /risk
      /evidence
          |
[ React + Vite Frontend ] --- [ Leaflet / Recharts ]
```

## Setup & Deployment

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | API Key for Gemini Pro | Required for chat |
| `GEMINI_MODEL` | Gemini Model ID | `gemini-1.5-pro` |
| `DEMO_MODE` | Enable deterministic mock responses | `true` |
| `S3_BUCKET` | S3 bucket for cloud storage | Optional |

### Local Development
```bash
npm install
npm run dev
```

### Ingestion Manual Trigger
```bash
npm run ingest
```

### Netlify Deployment
1. Connect this repo to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Functions directory: `netlify/functions`
