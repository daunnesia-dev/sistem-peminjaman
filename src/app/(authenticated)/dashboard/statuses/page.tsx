import Statuses from "@/components/dashboard/statuses";
import { DialogStatusCreate } from "@/components/dashboard/statuses/dialog-status-create";
import { currentUser } from "@clerk/nextjs";
import { FC, Suspense } from "react";

const page: FC = async () => {
    const user = await currentUser();
    const role = user?.publicMetadata.role;

    return (
        <>
            <div className="flex flex-col mb-6 space-y-2 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold tracking-tight">Master Statuses</h2>
                    <p className="text-gray-500">
                        Fitur ini digunakan untuk mengelola jenis status peminjaman buku dan ruangan
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    {role === "admin" && <DialogStatusCreate />}
                </div>
            </div>
            <Suspense>
                <Statuses />
            </Suspense>
        </>
    );
};

export default page;
