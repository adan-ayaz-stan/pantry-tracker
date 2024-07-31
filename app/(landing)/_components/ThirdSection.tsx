"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { submitForm } from "../_actions/form.action";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

export default function ThirdSection() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    toast.loading("Sending...", { id: "form-submit" });

    await submitForm(values);

    toast.success("Sent!", { id: "form-submit" });
  }

  return (
    <div className="bg-white min-h-screen pt-20 pb-12 flex flex-col justify-between items-center px-8">
      {/* Contact Me Form */}
      <div className="space-y-4">
        <h1 className="text-center">Write to me</h1>
        <hr className="h-2 bg-black w-20 mx-auto" />

        {/* Form goes here */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col"
          >
            <div className="flex gap-4 w-full max-w-7xl mt-20 my-12">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Your message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="mt-8 w-fit mx-auto rounded-full h-fit"
            >
              Send Message{" "}
              <span className="bg-white p-2 ml-2 rounded-full">
                <Icon
                  icon={"game-icons:basket"}
                  className="h-6 w-6 text-orange"
                />
              </span>
            </Button>
          </form>
        </Form>
      </div>

      {/* Footer Section */}

      <div className="w-full max-w-7xl grid grid-cols-3 md:grid-cols-12 gap-2 mt-20">
        {/* Alias Company Logo Card */}
        <div className="col-span-3 md:col-span-3 flex border-2 rounded-2xl border-[#FFDFB0]">
          <Image
            src={"/c-logo.svg"}
            alt={"c-logo"}
            height={150}
            width={150}
            className="object-cover m-auto rounded-2xl invert"
          />
        </div>
        <div className="col-span-3 md:col-span-3 p-8 flex bg-[#FFDFB0] rounded-2xl">
          <Image
            src={"/sign.svg"}
            alt={"footer"}
            height={150}
            width={150}
            className="object-cover m-auto rounded-2xl"
          />
        </div>
        <div className="col-span-3 md:col-span-6 flex p-4 rounded-2xl bg-[#FFDFB0]">
          <Image
            src={"/images/footer.jpg"}
            alt={"footer"}
            height={500}
            width={500}
            className="object-cover mx-auto rounded-2xl"
          />
        </div>
        <div className="col-span-3 md:col-span-6 p-4 bg-[#FFDFB0] rounded-2xl flex items-center text-xl font-bold">
          Made at the hands of{" "}
          <Link
            href={"https://github.com/adan-ayaz-stan"}
            className="underline mx-2"
          >
            Spitfire Kasnoviz
          </Link>
        </div>
        <Link
          href={"https://github.com/adan-ayaz-stan"}
          className="col-span-1 md:col-span-2 p-4 bg-white shadow-xl flex rounded-2xl border"
        >
          <Button variant={"ghost"} className="font-bold m-auto">
            <Icon
              icon={"entypo-social:github"}
              className="h-8 w-8 md:mr-2 text-black"
            />{" "}
            <span className="hidden md:block">Github</span>
          </Button>
        </Link>
        <Link
          href={"https://linkedin.com/in/adan-ayaz"}
          className="col-span-1 md:col-span-2 p-4 bg-white shadow-xl flex rounded-2xl border"
        >
          <Button variant={"ghost"} className="font-bold m-auto">
            <Icon icon={"bi:linkedin"} className="h-6 w-6 md:mr-2 text-black" />{" "}
            <span className="hidden md:block">LinkedIn</span>
          </Button>
        </Link>
        <Link
          href={"https://luceforge.vercel.app"}
          className="col-span-1 md:col-span-2 p-4 bg-white shadow-xl flex rounded-2xl border"
        >
          <Button variant={"ghost"} className="font-bold m-auto">
            <span className="hidden md:block">Umberella</span>
            <Icon
              icon={"system-uicons:external"}
              className="h-8 w-8 md:ml-2 text-black"
            />{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
}
