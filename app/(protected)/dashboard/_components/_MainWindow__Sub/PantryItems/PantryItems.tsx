import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import AddItemToPantry from "./_components/AddItemToPantry";

export default function PantryItems() {
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
            <AddItemToPantry />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
