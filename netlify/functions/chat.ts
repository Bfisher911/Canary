import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { messages } = JSON.parse(event.body || '{}');
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const isDemo = process.env.DEMO_MODE === 'true' || !geminiApiKey;

    if (isDemo) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: {
                    role: 'assistant',
                    content: "This is a deterministic demo response. In live mode, I would analyze your request using current signals and evidence."
                }
            }),
        };
    }

    // Real Gemini implementation would go here using fetch or SDK
    return {
        statusCode: 200,
        body: JSON.stringify({ error: 'Gemini integration pending' }),
    };
};
