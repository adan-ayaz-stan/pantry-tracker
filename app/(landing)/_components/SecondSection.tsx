import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

export default function SecondSection() {
  return (
    <div className="bg-white pt-20">
      <div className="h-fit lg:h-60 bg-white w-full">
        <div className="w-full h-full bg-[#FFECCF] max-w-7xl mx-auto rounded-3xl -top-1/4 px-16 py-8 relative flex items-end">
          <div className="relative flex flex-col lg:flex-row gap-6 w-full">
            {/* Pantry Item Card */}
            <PantryItemCard />

            {/* Feature Card */}
            <div className="flex-1 p-6 space-y-2 rounded-2xl bg-gradient-to-br from-[#FFFFFF] to-[#FFD28F] font-semibold">
              <h1 className="text-center px-16 mb-8">What is in it?</h1>

              {[
                "A pantry tracker with the simple appealing UI.",
                "An AI assistant to give you further insights on your items.",
                "Image recognition so you can add items with ease.",
                "AI-assisted recipe builder based on your pantry items.",
              ].map((ele) => {
                return (
                  <p key={ele} className="flex items-center gap-4">
                    <Image
                      src={"/star.svg"}
                      alt="star"
                      width={40}
                      height={40}
                      className="inline"
                    />
                    {ele}
                  </p>
                );
              })}
            </div>

            {/*  */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col h-full items-center justify-center bg-white rounded-2xl gap-4 py-8">
                <h4 className="tracking-widest uppercase font-bold">SINCE</h4>
                <h1 className="tracking-widest uppercase font-bold">2024</h1>
              </div>

              <div className="flex flex-row justify-between gap-2">
                <span className="bg-white p-6 rounded-xl">
                  <Icon
                    icon={"game-icons:basket"}
                    className="h-8 w-8 text-orange"
                  />
                </span>
                <span className="bg-white p-6 rounded-xl">
                  <Icon icon={"uis:calender"} className="h-8 w-8 text-orange" />
                </span>
                <span className="bg-white p-6 rounded-xl">
                  <Icon
                    icon={"fluent:food-28-filled"}
                    className="h-8 w-8 text-orange"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PantryItemCard() {
  return (
    <div className="flex flex-col p-8 rounded-xl bg-white">
      {/* Image */}
      <div className="relative flex">
        {/* Number of items */}
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-brown text-white font-bold text-xl p-2 px-3 rounded-full">
          x3
        </div>

        {/*  */}
        <Image
          src={"/images/hero-item.jpg"}
          alt="hero"
          height={200}
          width={200}
          className="w-full h-full object-cover mx-auto"
        />
      </div>
      <h3 className="my-2 font-bold">Coffee Capsules</h3>
      <Badge className="bg-[#DA7E89] rounded-sm w-fit">
        Est. Expiry: In a few days
      </Badge>
      <p className="text-muted-foreground mt-4">Added At: 07 Jul, 2024</p>
    </div>
  );
}
