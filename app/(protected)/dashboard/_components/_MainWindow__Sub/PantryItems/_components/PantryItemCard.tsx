"use client";

import Image from "next/image";
import { deletePantryItem, TgetPantryItem } from "../items.action";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RelativeTime from "react-relative-time";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PantryItemCard({ item }: { item: TgetPantryItem }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (item: TgetPantryItem) => deletePantryItem(item.id),
    onMutate: () => {
      toast.loading("Deleting item from pantry", { id: "delete-pantry-item" });
    },
    onSuccess: () => {
      toast.success("Item deleted from pantry", { id: "delete-pantry-item" });
      queryClient.refetchQueries({ queryKey: ["pantry", "items"] });
    },
  });

  return (
    <div className="relative bg-white p-6 rounded-2xl h-fit space-y-2">
      {/* Quantity Badge */}
      <div className="aspect-square rounded-full bg-brown text-white absolute top-4 right-4 p-2 px-3 text-xl font-bold">
        x{item.quantity}
      </div>

      <Image
        src={item.image}
        alt="hero"
        className="h-60 w-full rounded-xl object-cover"
        width={400}
        height={400}
      />
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{item.title}</h3>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Icon icon={"pepicons-print:dots-y"} className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              disabled={isPending}
              onClick={() => {
                mutate(item);
              }}
              className="font-semibold text-lg px-4 cursor-pointer"
            >
              <Icon
                icon={"material-symbols-light:delete"}
                className="h-8 w-8 mr-2 text-red-400"
              />{" "}
              Used Up
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border-2 py-2 px-4 text-center text-red-700 border-red-700 bg-red-200 rounded-xl">
        Expires <RelativeTime value={item.expiration_date} />
      </div>

      <div>
        <Link target="_blank" href={"?q=" + item.title}>
          <Button variant={"orange"} className="h-fit py-3 w-full rounded-xl">
            See Recipes
          </Button>
        </Link>
      </div>
    </div>
  );
}
