const { GoogleGenAI } = require("@google/genai");
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

const ai = new GoogleGenAI({ apiKey });

async function test() {
    const modelName = 'gemini-1.5-pro';
    try {
        console.log(`Testing ${modelName}...`);
        const result = await ai.models.generateContent({
            model: modelName,
            contents: [{ role: 'user', parts: [{ text: 'Hello, are you smarter?' }] }]
        });
        console.log(`SUCCESS with ${modelName}!`);
        console.log("Response:", result.text);
    } catch (e) {
        console.error(`FAILED ${modelName}:`, e.message);
    }
}

test();
