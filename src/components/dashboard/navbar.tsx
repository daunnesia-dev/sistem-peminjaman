import { NavbarMobile } from "@/components/dashboard/navbar-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { FC, Suspense } from "react";

const Navbar: FC = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex items-center h-20 border-b backdrop-blur-sm bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700">
      <div className={cn("container flex items-center justify-between w-full")}>
        <Link className="hidden lg:block" href="/dashboard">
          <h1 className="font-semibold leading-7 hover:underline text-slate-900 dark:text-slate-50 hover:underline-offset-4">
            Teknologi Rekayasa Komputer 💻
          </h1>
        </Link>

        <Button className={cn("px-0 lg:hidden")} variant="link" asChild>
          <Link href="/dashboard">Teknologi Rekayasa Komputer 💻</Link>
        </Button>

        <div className="lg:hidden">
          <Suspense>
            <NavbarMobile />
          </Suspense>
        </div>

        <div className="items-center justify-center hidden gap-4 lg:flex">
          <Suspense>
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/dashbord/settings"
            />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
