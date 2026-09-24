import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shahan Hassan | Graphic Designer & Video Editor",
  description:
    "Portfolio of Shahan Hassan - Graphic Designer & Video Editor specializing in high-octane music videos, cinematic brand films, and motion graphics.",
  keywords: [
    "Shahan Hassan",
    "Video Editor",
    "Graphic Designer",
    "Motion Designer",
    "Colorist",
    "Music Videos",
    "Commercials",
    "Showreel",
  ],
  authors: [{ name: "Shahan Hassan" }],
  openGraph: {
    title: "Shahan Hassan | Graphic Designer & Video Editor",
    description:
      "Kinetic visual stories, architectural rhythm, and uncompromising cut precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${bebasNeue.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
