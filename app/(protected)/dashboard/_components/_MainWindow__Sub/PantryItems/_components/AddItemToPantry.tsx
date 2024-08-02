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
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { addPantryItem } from "../items.action";

const formSchema = z.object({
  image: z.string().min(5, { message: "Image is required" }),
  title: z.string().min(2).max(50),
  expiration_date: z.date(),
  quantity: z.coerce.number().min(1).max(100),
  type: z.enum(["fruits", "vegetables", "dairy", "canned", "other"]),
});

type AddItemToPantryProps = {
  onSuccessItemAdd?: () => void;
};

// Webcam Config
const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "auto",
};

export default function AddItemToPantry({
  onSuccessItemAdd,
}: AddItemToPantryProps) {
  const webcamRef = useRef<Webcam>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "other",
      expiration_date: new Date(),
      quantity: 1,
    },
  });

  const capture = useCallback(() => {
    if (webcamRef.current) {
      // Ask for camera
      // base64 image
      const imageSrc = webcamRef.current.getScreenshot();

      if (!imageSrc) {
        toast.error("Failed to capture image");
        return;
      }

      setPreviewImage(imageSrc);
      form.setValue("image", imageSrc);
    }
  }, [webcamRef, form]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      toast.loading("Adding item to pantry...", { id: "form-submit" });

      await addPantryItem(values);

      toast.success("Item added to pantry", { id: "form-submit" });
      onSuccessItemAdd?.();
    } catch (err) {
      toast.error("Failed to upload item to pantry", { id: "form-submit" });
    }
  }

  //
  function changeDate(days_from_now: number) {
    const date = new Date();
    date.setDate(date.getDate() + days_from_now);
    form.setValue("expiration_date", date);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-cream p-4 rounded-2xl flex flex-col gap-4 border-2 border-orange"
      >
        {/* Upload photo */}
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              {/* Show image here if value true */}
              {value && previewImage && (
                <div className="relative">
                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage("");
                      form.setValue("image", "");
                    }}
                    className="absolute top-0 right-0 px-4 py-2"
                  >
                    <Icon
                      icon={"ph:x-circle-fill"}
                      className="h-8 w-8 text-black"
                    />
                  </button>

                  {/*  */}
                  <Image
                    src={previewImage}
                    alt="image"
                    width={300}
                    height={300}
                    className="mx-auto rounded-xl"
                  />
                </div>
              )}

              {/*  */}
              <FormLabel className="w-full relative flex items-center justify-center border-2 border-black bg-white h-fit p-4 text-black font-bold rounded-xl cursor-pointer hover:bg-zinc-100">
                <Icon
                  icon={"ph:upload-fill"}
                  className="h-8 w-8 text-black mr-2"
                />{" "}
                <span className="max-w-[150px] lg:max-w-xs truncate">
                  {value ? "Image Selected" : "Upload Photo"}
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Picture"
                  type="file"
                  accept="image/*, application/pdf"
                  className="hidden"
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      const file: File = event.target.files[0];
                      file.arrayBuffer().then((buffer) => {
                        const base64 = Buffer.from(buffer).toString("base64");
                        form.setValue("image", base64);
                      });

                      // Create URL Object Preview from FIle
                      const url = URL.createObjectURL(
                        event.target.files && event.target.files[0]
                      );

                      setPreviewImage(url);

                      // Revoke URL Object
                      setTimeout(() => URL.revokeObjectURL(url), 1000);
                    }
                  }}
                />
              </FormControl>
              {/* Take camera photo */}
              {!value && (
                <>
                  <Webcam
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                    audio={false}
                    height={720}
                    width={720}
                    screenshotFormat="image/jpeg"
                  />
                  <Button
                    onClick={capture}
                    variant={"secondary"}
                    type="button"
                    className="w-full bg-white h-fit py-4 text-black font-bold rounded-xl"
                  >
                    <Icon
                      icon={"teenyicons:camera-solid"}
                      className="h-8 w-8 text-black mr-2"
                    />{" "}
                    Take a snap
                  </Button>
                </>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

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
                <div className="flex flex-row flex-wrap gap-2 scrollbar-thin scrollbar-corner-cream scrollbar-track-transparent scrollbar-thumb-brown overflow-x-auto pb-2">
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                      changeDate(1);
                    }}
                  >
                    1 Day
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                      changeDate(3);
                    }}
                  >
                    3 Days
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                      changeDate(7);
                    }}
                  >
                    1 Week
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                      changeDate(7 * 4);
                    }}
                  >
                    4 Weeks
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                      changeDate(7 * 4 * 3);
                    }}
                  >
                    3 Months
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                      changeDate(7 * 4 * 12);
                    }}
                  >
                    1 Year
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                      changeDate(7 * 4 * 24);
                    }}
                  >
                    2 Years
                  </Button>
                </div>
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

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1"
                    type="number"
                    min={0}
                    max={1000}
                    className="focus-visible:ring-offset-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/*  */}
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          variant={"orange"}
          className="font-bold h-fit py-4"
        >
          Add Item to Pantry
        </Button>
      </form>
    </Form>
  );
}
