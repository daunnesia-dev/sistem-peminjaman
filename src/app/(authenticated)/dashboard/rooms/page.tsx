import Rooms from "@/components/dashboard/rooms";
import { Button } from "@/ui/button";
import { currentUser } from "@clerk/nextjs";
import { PlusIcon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

const page: FC = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role;

  if (!role || role !== "admin") {
    return notFound();
  }

  return (
    <>
      <div className="flex flex-col mb-6 space-y-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight">Master Ruangan</h2>
          <p className="text-gray-500">
            Daftar ruangan yang dapat dipinjam oleh mahasiswa.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            Tambah Ruangan
          </Button>
        </div>
      </div>
      <Suspense>
        <Rooms />
      </Suspense>
    </>
  );
};

export default page;
