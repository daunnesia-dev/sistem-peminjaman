import BooksData from "@/components/dashboard/books-data";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard Detail Data Buku",
};

const page = async ({ params }: { params: { id: number } }) => {
  const { userId } = auth();

  if (!userId) {
    return notFound();
  }

  return (
    <>
      <div className="flex flex-col mb-6 space-y-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight">
            Detail Data Buku
          </h2>
          <p className="text-gray-500">Detail buku yang terdaftar di sistem.</p>
          {JSON.stringify(params)}
        </div>
      </div>
    </>
  );
};

export default page;
