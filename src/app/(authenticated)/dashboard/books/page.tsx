import Books from "@/components/dashboard/books";
import AddButton from "@/components/dashboard/statuses/add-button";
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
                    <h2 className="text-3xl font-bold tracking-tight">Master Buku</h2>
                    <p className="text-gray-500">
                        Fitur ini digunakan untuk mengelola buku.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    {role === "admin" && <AddButton />}
                </div>
            </div>
            <Suspense>
                <Books />
            </Suspense>
        </>
    );
};

export default page;
