import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full p-4 flex gap-4 justify-between items-center rounded-xl bg-cream max-w-7xl mx-auto">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
        <h2 className="hidden md:block">Eatery Pantry</h2>
      </Link>

      {/* Sign Out Button */}
      <SignOutButton redirectUrl="/">
        <Button className="h-fit">
          Sign Out{" "}
          <Icon icon={"clarity:sign-out-solid"} className="h-8 w-8 ml-2" />
        </Button>
      </SignOutButton>
    </div>
  );
}
