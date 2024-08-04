import { mistral } from "@ai-sdk/mistral";
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
  instructions: z.array(z.string()),
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

  console.log(context);

  const result = await streamObject({
    model: mistral("mistral-small-latest"),
    schema: recipeSchema,
    prompt: `Create a recipe based on the following ingredients and instructions: ${context}.\n Try to keep it within the available items but loosely. If not available, then try to list a recipe that doesn't use too many ingredients outside the available items. Do not make any silly recipes.`,
  });

  return result.toTextStreamResponse();
}
