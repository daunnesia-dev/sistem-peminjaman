import Metrics from "@/components/dashboard/metrics";
import { Button } from "@/ui/button";
import { currentUser } from "@clerk/nextjs";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { FC, Suspense } from "react";

const page: FC = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role;

  return (
    <>
      <div className="flex flex-col mb-6 space-y-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-gray-500">
            Selamat datang kembali, {user?.firstName}
            {user?.lastName && ` ${user?.lastName}`}!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {role === "admin" && (
            <>
              <Button asChild>
                <Link href="/dashboard/books/create">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Tambah Buku
                </Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard/rooms/create">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Tambah Ruangan
                </Link>
              </Button>
            </>
          )}

          {role !== "admin" && (
            <>
              <Button asChild>
                <Link href="/dashboard/books-data">Pinjam Buku</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard/rooms-loan">Pinjam Ruangan</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <Suspense>
        <Metrics role={role} />
      </Suspense>
    </>
  );
};

export default page;
