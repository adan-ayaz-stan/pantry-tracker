"use server";

import { db } from "@/lib/db/firebase";
import { Recipe } from "@/types/edamam";
import { auth } from "@clerk/nextjs/server";
import { doc, setDoc } from "firebase/firestore";
import ky from "ky";
import { z } from "zod";

export async function getRecipes(ingredient: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const response = await ky.get("https://api.edamam.com/api/recipes/v2", {
      searchParams: {
        type: "public",
        app_id: `${process.env.EDAMAM_APP_ID}`,
        app_key: `${process.env.EDAMAM_API_KEY}`,
        q: `${ingredient}`,
      },
    });

    const body: Recipe = await response.json();

    return body;
  } catch (err) {
    throw err;
  }
}

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

export type TrecipeSchema = z.infer<typeof recipeSchema>;

export async function addRecipe(recipe: TrecipeSchema) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await setDoc(doc(db, "users", userId, "recipes", recipe.title), {
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      time_to_cook: recipe.time_to_cook,
    });

    return true;
  } catch (err) {
    throw err;
  }
}
