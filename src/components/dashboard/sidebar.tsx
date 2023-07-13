"use client";

import SidebarItem from "@/components/dashboard/sidebar-item";
import { sidebarConfig } from "@/data/sidebar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/ui/scroll-area";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      id="sidebar"
      className="fixed z-30 hidden h-[calc(100vh-3.5rem)] w-full bg-slate-50 dark:bg-slate-900 border-r top-20 shrink-0 lg:sticky lg:block border-slate-300 dark:border-slate-700"
    >
      <ScrollArea className="h-full py-6 pr-6 lg:pl-8 lg:py-8">
        {sidebarConfig.sidebarNav.length ? (
          <div className="w-full">
            {sidebarConfig.sidebarNav.map((item, index) => (
              <div key={index} className={cn("pb-4")}>
                <h4 className="py-1 mb-1 text-sm font-semibold rounded-md">
                  {item.title}
                </h4>
                {item?.items?.length && (
                  <SidebarItem items={item.items} pathname={pathname} />
                )}
              </div>
            ))}
          </div>
        ) : null}
      </ScrollArea>
    </aside>
  );
}
