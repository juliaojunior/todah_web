const { GoogleGenAI } = require("@google/genai");
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

const ai = new GoogleGenAI({ apiKey });

async function test() {
    const modelsToTry = [
        'gemini-1.5-pro-latest',
        'gemini-1.5-pro-001',
        'gemini-1.5-pro-002', // Sometimes available
        'gemini-pro' // 1.0
    ];

    for (const model of modelsToTry) {
        try {
            console.log(`Testing ${model}...`);
            const result = await ai.models.generateContent({
                model: model,
                contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
            });
            console.log(`SUCCESS with ${model}!`);
            console.log("Response:", result.text);
            return; // Exit on first success
        } catch (e) {
            console.error(`FAILED ${model}:`, e.message);
        }
    }
    console.log("All failed.");
}

test();
