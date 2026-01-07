import { inngest } from "./client";
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOpenAI } from '@ai-sdk/openai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

import { db } from "@/server/db";

const google = createGoogleGenerativeAI()
const openai = createOpenAI()
const anthropic = createAnthropic()

const getModel = (modelName: string) => {
    if (modelName.includes('gpt')) return openai(modelName)
    if (modelName.includes('claude')) return anthropic(modelName)
    if (modelName.includes('gemini')) return google(modelName)
    return google("gemini-2.5-flash")
}

export const executeAI = inngest.createFunction(
    { id: "execute-ai" },
    { event: "execute/ai" },
    async ({ event, step }) => {
        const modelName = event.data.model || "gemini-2.5-flash";
        const prompt = event.data.name || "Write a recipe for a vegetarian lasanga for 4 people.";
        const userId = event.data.userId;

        const { text } = await step.ai.wrap("generate-text", generateText, {
            model: getModel(modelName),
            system: "You are a helpful assistant.",
            prompt: prompt,
        })

        if (userId) {
            await step.run("save-post", async () => {
                await db.post.create({
                    data: {
                        name: text,
                        createdById: userId
                    }
                })
            })
        }

        return { event, body: text };
    }
);
