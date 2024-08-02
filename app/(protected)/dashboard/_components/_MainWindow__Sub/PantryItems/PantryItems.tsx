"use client";

import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import AddItemToPantry from "./_components/AddItemToPantry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef } from "react";
import { getPantryItems, TgetPantryItem } from "./items.action";
import { Icon } from "@iconify/react/dist/iconify.js";
import PantryItemCard from "./_components/PantryItemCard";

export default function PantryItems() {
  const queryClient = useQueryClient();
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const { isLoading, data, isSuccess } = useQuery<TgetPantryItem[]>({
    queryKey: ["pantry", "items"],
    queryFn: () => getPantryItems(),
  });

  return (
    <div className="bg-cream h-full p-4 rounded-2xl">
      {/* Search Bar and Add Item Button */}
      <div className="w-full flex items-center justify-between gap-4">
        <Input
          placeholder="Search Pantry Items"
          className="bg-cream focus-visible:ring-0 focus-visible:outline-none"
        />

        <Dialog>
          <DialogTrigger>
            <Button type="button" variant={"orange"}>
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-white rounded-2xl">
            <DialogClose ref={dialogCloseRef} className="hidden" />
            <ScrollArea className="max-h-[80vh] rounded-2xl">
              <AddItemToPantry
                onSuccessItemAdd={() => {
                  dialogCloseRef.current?.click();
                  queryClient.invalidateQueries({
                    queryKey: ["pantry", "items"],
                  });
                }}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pantry Items Will Be Shown Here */}
      <div className="h-full py-8 flex gap-4 flex-wrap">
        {isLoading && (
          <div className="p-4 flex w-full">
            <Icon
              icon={"eos-icons:loading"}
              className="h-16 w-16 mx-auto text-brown"
            />
          </div>
        )}

        {isSuccess && (
          <>
            {data?.map((item) => (
              <PantryItemCard key={item.id} item={item} />
            ))}
            {data?.length === 0 && (
              <div className="p-4 flex w-full">
                <p className="text-center m-auto">
                  No Items to show. Click Add Item to add one.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
