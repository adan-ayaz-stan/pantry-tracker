import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react/dist/iconify.js";
import PantryItems from "./_MainWindow__Sub/PantryItems/PantryItems";
import RecipeCenter from "./_MainWindow__Sub/RecipeCenter/RecipeCenter";
import RunningLow from "./_MainWindow__Sub/RunningLow/RunningLow";
import ExpiringSoon from "./_MainWindow__Sub/ExpiringSoon/ExpiringSoon";

export default function MainWindow() {
  return (
    <Tabs
      defaultValue="recipe-center"
      className="flex-1 grid grid-cols-[400px_1fr] gap-4 max-w-7xl mx-auto w-full"
    >
      <TabsList className="flex flex-col items-start justify-start p-4 gap-4 h-full bg-cream">
        <TabsTrigger
          value="recipe-center"
          className="w-full justify-start text-xl font-bold rounded-xl py-4 bg-white data-[state=active]:bg-orange data-[state=active]:text-white"
        >
          <Icon icon={"dashicons:food"} className="h-8 w-8 text-inherit mr-2" />{" "}
          Recipe Center
        </TabsTrigger>
        <TabsTrigger
          value="pantry-items"
          className="w-full justify-start text-xl font-bold rounded-xl py-4 bg-white data-[state=active]:bg-orange data-[state=active]:text-white"
        >
          <Icon icon={"bxs:food-menu"} className="h-8 w-8 text-inherit mr-2" />{" "}
          Pantry Items
        </TabsTrigger>
        <TabsTrigger
          value="running-low"
          className="w-full justify-start text-xl font-bold rounded-xl py-4 bg-white data-[state=active]:bg-orange data-[state=active]:text-white"
        >
          <Icon
            icon={"fluent:book-exclamation-mark-24-filled"}
            className="h-8 w-8 text-inherit mr-2"
          />{" "}
          Running Low
        </TabsTrigger>
        <TabsTrigger
          value="expiring-soon"
          className="w-full justify-start text-xl font-bold rounded-xl py-4 bg-white data-[state=active]:bg-orange data-[state=active]:text-white"
        >
          <Icon icon={"pajamas:expire"} className="h-8 w-8 text-inherit mr-2" />{" "}
          Expiring Soon
        </TabsTrigger>
      </TabsList>
      <TabsContent value="recipe-center" className="mt-0">
        <RecipeCenter />
      </TabsContent>
      <TabsContent value="pantry-items" className="mt-0">
        <PantryItems />
      </TabsContent>
      <TabsContent value="running-low" className="mt-0">
        <RunningLow />
      </TabsContent>
      <TabsContent value="expiring-soon" className="mt-0">
        <ExpiringSoon />
      </TabsContent>
    </Tabs>
  );
}
