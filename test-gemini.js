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
        'gemini-2.0-flash-exp',
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-1.0-pro',
        'gemini-pro'
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
}

test();
