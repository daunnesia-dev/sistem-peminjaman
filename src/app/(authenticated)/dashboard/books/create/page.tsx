import CreateBook from "@/components/dashboard/books/create-book";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

const page: FC = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role;

  if (!role) {
    return notFound();
  }

  return (
    <>
      <div className="flex flex-col mb-6 space-y-2">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight">Tambah Buku</h2>
          <p className="text-gray-500">
            Halaman ini digunakan untuk menambahkan buku.
          </p>
        </div>
      </div>
      <Card>
        <CardContent className={cn("p-6")}>
          <Suspense>
            <CreateBook />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
};

export default page;
