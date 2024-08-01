"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  image: z.string(),
  title: z.string().min(2).max(50),
  expiration_date: z.date(),
  quantity: z.number().min(1).max(100),
  type: z.enum(["fruits", "vegetables", "dairy", "canned", "other"]),
});

type AddItemToPantryProps = {
  onSuccessItemAdd?: () => void;
};

export default function AddItemToPantry({
  onSuccessItemAdd,
}: AddItemToPantryProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      type: "other",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-cream p-4 rounded-2xl flex flex-col gap-4 border-2 border-orange"
      >
        {/* Take camera photo */}
        <Button
          variant={"secondary"}
          className="bg-white h-fit py-4 text-black font-bold rounded-xl"
        >
          <Icon
            icon={"teenyicons:camera-solid"}
            className="h-8 w-8 text-black mr-2"
          />{" "}
          Take a snap
        </Button>
        {/* Upload photo */}
        <Button
          variant={"secondary"}
          className="bg-white h-fit py-4 text-black font-bold rounded-xl"
        >
          <Icon icon={"ph:upload-fill"} className="h-8 w-8 text-black mr-2" />{" "}
          Upload Photo
        </Button>

        {/* Input Fields */}
        <div className="p-4 rounded-xl bg-white space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of Item</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Canned Pickles"
                    className="focus-visible:ring-offset-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiration_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Expiration Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {formSchema._def.shape().type._def.values.map((ele, i) => {
                      return (
                        <SelectItem key={ele + i} value={ele}>
                          {ele}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/*  */}
        <Button variant={"orange"} className="font-bold h-fit py-4">
          Add Item to Pantry
        </Button>
      </form>
    </Form>
  );
}
