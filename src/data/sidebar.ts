import { SidebarNavItem } from "@/types/dashboard/nav";

interface SidebarConfig {
  sidebarNav: SidebarNavItem[];
}

export const sidebarConfig: SidebarConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Beranda",
          href: "/dashboard",
          items: [],
        },
        {
          title: "Pengguna",
          href: "/dashboard/users",
          items: [],
          role: "admin",
        },
      ],
    },
    {
      title: "Master Data",
      items: [
        {
          title: "Master Buku",
          href: "/dashboard/books",
          items: [],
          role: "admin",
        },
        {
          title: "Data Buku",
          href: "/dashboard/books-data",
          items: [],
        },
        {
          title: "Peminjaman Buku",
          href: "/dashboard/book-loans",
          items: [],
        },
        {
          title: "Riwayat Peminjaman Buku",
          href: "/dashboard/book-loans-history",
          items: [],
        },
        {
          title: "Master Ruangan",
          href: "/dashboard/rooms",
          items: [],
          role: "admin",
        },
        {
          title: "Peminjaman Ruangan",
          href: "/dashboard/room-loans",
          items: [],
        },
        {
          title: "Riwayat Peminjaman Ruangan",
          href: "/dashboard/room-loans-history",
          items: [],
        },
      ],
    },
    {
      title: "Akun",
      items: [
        {
          title: "Pengaturan Akun",
          href: "/dashboard/settings",
          items: [],
        },
        {
          title: "Ganti Password",
          href: "/dashboard/change-password",
          items: [],
        },
      ],
    },
  ],
};
