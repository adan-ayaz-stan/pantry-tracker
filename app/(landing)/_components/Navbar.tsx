"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="p-8 md:px-16 w-full fixed top-0 left-0 flex items-center justify-between z-50 bg-white">
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
        <h2>Eatery Pantry</h2>
      </Link>

      {/* Links */}
      {/* <div className="flex items-center gap-4">
        <Link href={"/"}>
          <h2 className={cn(pathname == "/" && "text-orange")}>About</h2>
        </Link>
        <Link href={"/team"}>
          <h2 className={cn(pathname == "/team" && "text-orange")}>Team</h2>
        </Link>
      </div> */}

      {/* Sign In Button */}
      <Link href={"/sign-in"}>
        <Button
          type="button"
          className="font-bold text-xl bg-orange hover:bg-orange/70"
        >
          Sign In{" "}
          <Icon icon={"ph:door-fill"} className="h-8 w-8 ml-2 text-white" />
        </Button>
      </Link>
    </div>
  );
}
