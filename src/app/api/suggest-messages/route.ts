// FILE: src/app/api/suggest-messages/route.ts

import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { jsonRes } from "@/lib/JSONresponse"; // Your existing utility function
import { z } from 'zod';

// Define the Zod schema for the expected JSON output
const SuggestionSchema = z.object({
    suggestions: z.array(
        z.string()
            .min(10, "Suggestion must be at least 10 characters")
            .max(150, "Suggestion must be concise")
    ).max(5, "Maximum 5 suggestions").min(3, "Minimum 3 suggestions")
});

export async function POST(req: Request) { // Using POST as requested by your skeleton
    try {
        
        const model = google('gemini-2.5-flash');

        
        const systemPrompt = "You are an expert prompt generator for an anonymous feedback application. Your task is to generate three unique, concise, and helpful suggestions (or starter phrases) that encourage constructive and positive anonymous communication between users. The output MUST strictly adhere to the provided JSON schema.";
        
        const userPrompt = "Generate three excellent, neutral, and actionable message suggestions. Focus on appreciation, ideas for growth, or open-ended questions.";

        
        const { text: jsonText } = await generateText({
            model: model,
            system: systemPrompt,
            prompt: userPrompt
        });

        
        const parsedResult = SuggestionSchema.safeParse(JSON.parse(jsonText));

        if (!parsedResult.success) {
            console.error("AI SDK generated invalid JSON structure:", parsedResult.error);
            return jsonRes(false, "AI failed to generate suggestions in the required format.", 500);
        }
        
        
        return jsonRes(
            true,
            "AI-based suggestions retrieved successfully",
            200,
            { suggestions: parsedResult.data.suggestions }
        );

    } catch (error) {
        console.error("Error generating AI suggestions:", error);
        return jsonRes(
            false,
            "Failed to generate AI-based suggestions.",
            500
        );
    }
}