"use server";

import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { NARRATIVE_PROMPT, SINESTHETIC_PROMPT, FRAGMENT_PROMPT } from "@/lib/prompts";
import { AdaptationMode } from "@/lib/types";

export interface GenerateResult {
    success: boolean;
    text?: string;
    error?: string;
}

export async function generateAdaptationAction(
    prevState: any,
    formData: FormData
): Promise<GenerateResult> {
    const question = formData.get("question") as string;
    const theme = formData.get("theme") as string;
    const mode = formData.get("mode") as AdaptationMode;
    const image = formData.get("image") as File | null;

    if (!theme || (!question && !image)) {
        return { success: false, error: "Dados incompletos." };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY not found in environment variables.");
        return { success: false, error: "Erro de configuração do servidor. (API Key)" };
    }

    try {
        const ai = new GoogleGenAI({ apiKey });

        // Prepare Image Part if exists
        let imagePart = null;
        if (image && image.size > 0) {
            // Convert File to base64 for the API
            const arrayBuffer = await image.arrayBuffer();
            const base64Data = Buffer.from(arrayBuffer).toString('base64');

            imagePart = {
                inlineData: {
                    data: base64Data,
                    mimeType: image.type || 'image/jpeg'
                }
            };
        }

        const parts: any[] = [];
        if (imagePart) {
            parts.push(imagePart);
            parts.push({ text: "Analise a imagem acima para extrair o problema de física. Se houver texto digitado abaixo, use-o para complementar." });
        }

        const userPrompt = `
    **ENUNCIADO/QUESTÃO ORIGINAL:**
    ${question ? question : (imagePart ? "[Extrair da imagem anexa]" : "Nenhuma questão fornecida.")}

    **TEMA DE HIPERFOCO ESCOLHIDO:**
    ${theme}

    Adapte a questão acima seguindo as instruções do sistema.
    `;
        parts.push({ text: userPrompt });

        let systemInstruction = NARRATIVE_PROMPT;
        if (mode === 'sinesthetic') systemInstruction = SINESTHETIC_PROMPT;
        if (mode === 'fragment') systemInstruction = FRAGMENT_PROMPT;

        // New SDK Usage (@google/genai)
        // Reverting to 2.0-flash-exp as it is the only model supported by this key/region currently.
        const result = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: [{ role: 'user', parts: parts }],
            config: {
                systemInstruction: { parts: [{ text: systemInstruction }] },
                temperature: 0.8,
                maxOutputTokens: 8192,
                safetySettings: [
                    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
                    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
                    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
                    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH }
                ],
            }
        });

        // In @google/genai v0.1+ result.text might be a getter or property returning the string directly
        const responseText = result.text;

        if (!responseText) {
            return { success: false, error: "A IA não retornou texto." };
        }

        return { success: true, text: responseText };

    } catch (error) {
        console.error("Gemini Generation Error:", error);
        return { success: false, error: "Falha ao gerar adaptação. Tente novamente." };
    }
}
