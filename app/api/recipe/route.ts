import { openai } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";
import { streamObject } from "ai";
import { z } from "zod";

const recipeSchema = z.object({
  title: z.string(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string(),
    })
  ),
  instructions: z.string(),
  time_to_cook: z.string(),
});

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const context = await req.json();

  const result = await streamObject({
    model: openai("gpt-3.5-turbo"),
    schema: recipeSchema,
    prompt:
      `Generate a recipe for the given context. Try to create a recipe within the ingredients available in the context. Otherwise, if it's not possible, then try to minimize the additional ingredients needed to cook  a possible recipe. Context:` +
      context,
  });

  return result.toTextStreamResponse();
}
