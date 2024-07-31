import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="min-h-screen flex flex-col justify-center gap-8">
      <div className="w-full flex justify-between items-center gap-8 mx-auto max-w-7xl">
        {/* Left Side */}
        <div>
          <h1>
            Explore your <span className="text-orange">inventory</span>
            <br />
            easier than ever
          </h1>

          <p className="text-muted-foreground mt-4 max-w-xl">
            Boost your productivity by managing your inventory with ease,
            quicker than ever. Pantry management made further easier with an
            assistant.
          </p>

          {/* Button */}

          <Link href={"/dashboard"}>
            <Button className="mt-8 rounded-full h-fit">
              Sign Up{" "}
              <span className="bg-white p-2 ml-2 rounded-full">
                <Icon
                  icon={"game-icons:basket"}
                  className="h-6 w-6 text-orange"
                />
              </span>
            </Button>
          </Link>
        </div>

        {/* Right Side */}

        <div className="aspect-square relative">
          <Image
            src={"/images/hero-image.jpg"}
            alt="hero"
            className="w-96 h-96 rounded-full object-cover"
            width={500}
            height={500}
          />

          <TextPop className="absolute left-0 -translate-x-1/2 top-1/4">
            Dry Fruits
          </TextPop>
          <TextPop className="absolute right-0 translate-x-1/2 top-1/2">
            6-12 Months Life
          </TextPop>
          <TextPop className="absolute left-1/2 -translate-x-1/2 bottom-4">
            Instructions
          </TextPop>
        </div>
      </div>
    </div>
  );
}

function TextPop({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-fit p-2 bg-white/75 rounded-full text-center",
        className
      )}
    >
      <h4 className="w-fit p-2 px-8 bg-white rounded-full font-bold">
        {children}
      </h4>
    </div>
  );
}
