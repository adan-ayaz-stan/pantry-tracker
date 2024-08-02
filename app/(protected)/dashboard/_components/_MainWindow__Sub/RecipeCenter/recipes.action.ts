"use server";

import { Recipe } from "@/types/edamam";
import { auth } from "@clerk/nextjs/server";
import ky from "ky";

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
