"use client";

import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { getRecipes } from "./recipes.action";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RecipeCenter() {
  const router = useRouter();

  const params = useSearchParams();
  const [queryText, setQueryText] = useState(params.get("q") || "");

  const { isLoading, data } = useQuery({
    queryKey: ["recipe", params.get("q")],
    queryFn: () => getRecipes(params.get("q") || ""),
  });

  function onSearch() {
    router.push(`/dashboard?q=${queryText}`);
  }

  return (
    <div className="bg-cream h-full p-4 rounded-2xl">
      <h2>Recipe Center</h2>
      {/*  */}
      <div className="w-full flex items-center justify-between gap-4">
        <Input
          placeholder="Search Recipe Here"
          defaultValue={params.get("q") || ""}
          onChange={(e) => setQueryText(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") onSearch();
          }}
          className="bg-cream focus-visible:ring-0 focus-visible:outline-none"
        />

        <Button onClick={onSearch} variant={"orange"}>
          Search
        </Button>
      </div>

      {/*  */}
      <div className="flex flex-row flex-wrap gap-4 py-4">
        {isLoading && (
          <div className="p-4 flex w-full">
            <Icon
              icon={"eos-icons:loading"}
              className="h-16 w-16 mx-auto text-brown"
            />
          </div>
        )}
        {/*  */}
        {data?.hits.length == 0 && (
          <div className="p-4 flex w-full">
            <p className="m-auto text-center">
              No recipes to show. Type something and hit Enter.
            </p>
          </div>
        )}
        {data?.hits.map((item) => (
          <div
            key={item.recipe.label}
            className="relative max-w-sm bg-white p-6 rounded-2xl h-fit"
          >
            <img
              src={item.recipe.image}
              alt={item.recipe.label}
              className="rounded-xl"
            />
            <h3 className="font-bold mt-4">{item.recipe.label}</h3>
            <p className="w-fit text-green-900 px-2 rounded-md bg-green-300 my-2 font-semibold">
              Ingredients: {item.recipe.ingredients.length}
            </p>

            <Link target="_blank" href={item.recipe.url}>
              <Button variant={"orange"}>See Recipe</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
