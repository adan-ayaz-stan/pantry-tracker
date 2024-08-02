import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easy Pantry",
  description:
    "A digital kitchen management system that helps users track and organize their food inventory, plan meals, and reduce food waste.",
  keywords:
    "food pantry near me, pantry cabinet, pantry, food pantry, pantry organization, kitchen pantry cabinet, kitchen pantry, butlers pantry, pantry moths, pantry shelving, pantry door, the pantry, amazon pantry, food pantry near me open today, pantry ideas, pantry organization ideas, pancake pantry, pantry cabinets, pantry doors, pantry shelves",
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/ddfjwg2rb/image/upload/v1722621960/My%20Uploads/Portfolio%20Projects/Pantry%20Tracker/Images/ThumbnailImage.jpg",
        width: 800,
        height: 600,
        alt: "Pantry Organization Ideas",
      },
      {
        url: "https://res.cloudinary.com/ddfjwg2rb/image/upload/v1722621960/My%20Uploads/Portfolio%20Projects/Pantry%20Tracker/Images/ThumbnailImage.jpg",
        width: 800,
        height: 600,
        alt: "Kitchen Pantry Cabinet",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <ClerkProvider>
        <html lang="en">
          <body className={urbanist.className}>{children}</body>
          <Toaster />
        </html>
      </ClerkProvider>
    </Providers>
  );
}
