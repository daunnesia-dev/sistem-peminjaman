import Providers from "@/components/providers";
import { SITE } from "@/config";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE.name}`,
    default: SITE.title,
  },
  description: SITE.description,
  applicationName: SITE.applicationName,
  keywords: SITE.keywords,
  authors: SITE.authors,
  creator: SITE.creator,
  themeColor: SITE.themeColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "motion-safe:scroll-smooth bg-white antialiased",
        inter.className
      )}
    >
      <body className="min-h-screen antialiased bg-slate-50 dark:bg-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
