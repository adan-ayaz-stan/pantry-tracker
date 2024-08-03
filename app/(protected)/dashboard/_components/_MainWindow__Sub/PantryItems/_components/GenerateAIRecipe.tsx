import { useQuery } from "@tanstack/react-query";
import { getPantryItems, TgetPantryItem } from "../items.action";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { experimental_useObject as useObject } from "ai/react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";

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
    submit({
      items_available: data?.map((item) => {
        return {
          item_name: item.title,
          amount: item.quantity,
        };
      }),
    });
  }

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

            <p className="text-sm">{object.instructions}</p>
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
