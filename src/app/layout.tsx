import Banner from "@/components/banner";
import Providers from "@/components/providers";
import { SITE } from "@/config";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Toaster } from "@/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

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
    <ClerkProvider>
      <html
        lang="en"
        className={cn(
          "motion-safe:scroll-smooth bg-white antialiased",
          inter.className
        )}
      >
        <body className="min-h-screen antialiased bg-zinc-50 dark:bg-zinc-900">
          <Providers>
            <NextTopLoader height={5} />
            {children}
            <Toaster />
            <Banner />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
