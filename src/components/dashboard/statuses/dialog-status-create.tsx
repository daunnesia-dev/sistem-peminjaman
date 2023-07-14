import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast";
import { createStatus } from "@/helpers/dashboard/statuses/create-statuses";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";

export function DialogStatusCreate() {
    // const { isSuccess, mutate, isLoading, isError } = createStatus();
    // const { toast } = useToast();
    // const formRef = React.useRef<HTMLFormElement>(null);

    // const onSubmitHandler = (id: number) => {
    //     mutate({
    //         keterangan
    //     });
    // };

    // useEffect(() => {
    //     if (isSuccess) {
    //         toast({
    //             title: "Status Dihapus",
    //             description: `Status telah berhasil ditambahkan`,
    //         });
    //     }

    //     if (isError) {
    //         toast({
    //             variant: "destructive",
    //             title: "Error",
    //             description: "Terjadi kesalahan menyimpan data",
    //         });
    //     }
    // }, [isSuccess, isError, toast]);

    // return (
    //     <Dialog>
    //         <DialogTrigger asChild>
    //             <Button variant="outline">Tambah Status</Button>
    //         </DialogTrigger>
    //         <form ref={formRef} onSubmit={onSubmitHandler}>
    //             <DialogContent className="sm:max-w-[425px]">
    //                 <DialogHeader>
    //                     <DialogTitle>Tambah Status</DialogTitle>
    //                     <DialogDescription>
    //                         Tambah data status peminjaman buku dan ruangan
    //                     </DialogDescription>
    //                 </DialogHeader>
    //                 <div className="grid gap-4 py-4">
    //                     <div className="grid grid-cols-4 items-center gap-4">
    //                         <Label htmlFor="keterangan" className="text-right">
    //                             Keterangan
    //                         </Label>
    //                         <Input id="keterangan" value="" className="col-span-3" />
    //                     </div>
    //                 </div>
    //                 <DialogFooter>
    //                     <Button type="submit">
    //                         {isLoading ? (<ReloadIcon className="w-4 h-4 mr-2 animate-spin" />) : null}
    //                         <span>Simpan</span>
    //                     </Button>
    //                 </DialogFooter>
    //             </DialogContent>
    //         </form>
    //     </Dialog>
    // )
}
