import RoomsLoansHistory from "@/components/dashboard/rooms-loans-history";
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
            <div className="flex flex-col mb-6 space-y-2 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold tracking-tight">Riwayat Peminjaman Ruangan</h2>
                    <p className="text-gray-500">
                        Fitur ini digunakan untuk mengelola riwayat peminjaman ruangan.
                    </p>
                </div>
            </div>
            <Suspense>
                <RoomsLoansHistory />
            </Suspense>
        </>
    );
};

export default page;
