import { useMutation, useQuery } from "@tanstack/react-query";
import { getPantryItems, TgetPantryItem } from "../items.action";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { experimental_useObject as useObject } from "ai/react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { addRecipe, TrecipeSchema } from "../../RecipeCenter/recipes.action";
import { toast } from "sonner";

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

export default function GenerateAIRecipe() {
  const [input, setInput] = useState("");

  const { data } = useQuery<TgetPantryItem[]>({
    queryKey: ["pantry", "items"],
    queryFn: () => getPantryItems(),
  });

  const {
    object,
    submit,
    isLoading: isGenerating,
    error,
  } = useObject({
    api: "/api/recipe",
    schema: recipeSchema,
  });

  function generateRecipe() {
    // Construct prompt string
    const items_object = {
      items_available: data?.map((item) => {
        return {
          item_name: item.title,
          amount: item.quantity,
        };
      }),
      additonal_instructions: input,
    };

    const available_items_string = items_object.items_available
      ?.map((item) => {
        return `${item.amount}x ${item.item_name}`;
      })
      .join(", ");

    const prompt_string = `The items available are: ${available_items_string}. Morever you have to take care of the following instruction: ${items_object.additonal_instructions}`;

    //
    submit(prompt_string);
  }

  async function addRecipeToMyRecipes() {
    if (object) {
      await addRecipe(object as TrecipeSchema);
    }
  }

  const { mutate } = useMutation({
    mutationKey: ["recipe", "add"],
    mutationFn: addRecipeToMyRecipes,
    onMutate: () => {
      toast.loading("Adding recipe to my recipes", { id: "add-recipe" });
    },
    onSuccess: () => {
      toast.success("Recipe added to my recipes", { id: "add-recipe" });
    },
    onError: () => {
      toast.error("Failed to add recipe to my recipes", { id: "add-recipe" });
    },
  });

  return (
    <div className="bg-cream h-full p-4 rounded-2xl">
      <h2>Generate AI Recipe</h2>
      <p className="mb-4">
        AI is going to generate a recipe based on your current pantry items.
      </p>

      <AnimatePresence mode="wait">
        {object == undefined && (
          <AnimatePresence mode="wait">
            {/* Initial Form */}
            {!isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Label>Anything else you&apos;d like to add?</Label>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-cream mb-4"
                  placeholder="I only have a garlic and tomato sauce available..."
                />
                <Button
                  type="button"
                  onClick={generateRecipe}
                  className="w-full"
                >
                  Generate AI Recipe
                </Button>
              </motion.div>
            )}

            {/* Loading State */}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-4"
                id="loading-state-recipe"
              >
                <p>Generating...</p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        {object !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3>{object.title}</h3>
            <p>{object.time_to_cook}</p>

            <div className="my-4 flex flex-row gap-3 flex-wrap">
              <strong>Ingredients:</strong>{" "}
              <ul>
                {object.ingredients?.map((ingredient) => (
                  <li key={ingredient?.name}>
                    {ingredient?.name} {ingredient?.amount}
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-4">
              <strong>Instructions:</strong>
              <ol>
                {object.instructions?.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ol>
            </div>

            <DialogClose className="w-full">
              <Button
                onClick={() => mutate()}
                type="button"
                variant={"orange"}
                className="w-full"
              >
                Add to my recipes
              </Button>
            </DialogClose>
          </motion.div>
        )}
      </AnimatePresence>

      {(error as Error) && (
        <>
          <p className="text-red-500">
            {(error as Error).message ||
              "Something went wrong and app qouta might've exceeded. Please try again later."}
          </p>
          <DialogClose className="w-full py-4 border-2 border-black bg-white rounded-xl text-center">
            Close{" "}
            <kbd className="border-2 border-black rounded-sm px-1 font-bold">
              esc
            </kbd>
          </DialogClose>
        </>
      )}
    </div>
  );
}
