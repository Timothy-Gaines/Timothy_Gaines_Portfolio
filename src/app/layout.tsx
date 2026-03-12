import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Timothy Gaines | Receipt to Reimbursed",
  description: "Project Management, Operations, Business Development, and Analytics. Building systems that make spending clearer, faster, and easier to manage.",
  keywords: ["Timothy Gaines", "Portfolio", "Project Management", "Operations", "Business Development", "Data Analytics", "Reimbursement"],
  authors: [{ name: "Timothy Gaines" }],
  openGraph: {
    title: "Timothy Gaines | Receipt to Reimbursed",
    description: "Project Management, Operations, Business Development, and Analytics portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("noise-overlay", "font-sans", geist.variable)}>
      <body className="antialiased font-body text-primary-text bg-background">
        {children}
      </body>
    </html>
  );
}
