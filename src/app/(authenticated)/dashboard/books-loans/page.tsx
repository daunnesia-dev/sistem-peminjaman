import BooksLoans from "@/components/dashboard/books-loans";
import AddButton from "@/components/dashboard/books-loans/add-button";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard Peminjaman Buku",
};

const page: FC = async () => {
  const { userId } = auth();

  if (!userId) {
    return notFound();
  }

  return (
    <>
      <div className="flex flex-col mb-6 space-y-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight">Peminjaman Buku</h2>
          <p className="text-gray-500">
            Fitur ini digunakan untuk mengelola peminjaman buku.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <AddButton />
        </div>
      </div>
      <Suspense>
        <BooksLoans />
      </Suspense>
    </>
  );
};

export default page;
