/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { detailRoomsLoans } from "@/helpers/dashboard/rooms-loans/detail-rooms-loans";
import { cn } from "@/lib/utils";
import { createResponseRoomsLoansProps } from "@/lib/validator/dashboard/rooms-loans/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { DropdownMenuItem } from "@/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { useToast } from "@/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function DetailButton({ id }: { id: number }) {
  const form = useForm<z.infer<typeof createResponseRoomsLoansProps>>({
    resolver: zodResolver(createResponseRoomsLoansProps),
    defaultValues: {
      namaRuangan: "",
      tanggalPinjam: "",
      tanggalKembali: "",
      keterangan: "",
      status: "",
      namaPeminjam: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = detailRoomsLoans(id, isOpen);
  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      form.setValue("namaRuangan", data.namaRuangan);
      form.setValue("tanggalPinjam", data.tanggalPinjam);
      form.setValue("tanggalKembali", data.tanggalKembali);
      form.setValue("keterangan", data.keterangan);
      form.setValue("status", data.status);
      form.setValue("namaPeminjam", data.namaPeminjam);
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data detail buku",
      });
      form.reset();
      setIsOpen(false);
    }
  }, [data, error, form]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem className={cn("hover:cursor-pointer")}>
          Detail
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-slate-50">
        <DialogHeader>
          <DialogTitle>Detail Pinjam Ruangan</DialogTitle>
        </DialogHeader>
        {isLoading && (
          <p className="flex items-center gap-2 space-x-2 leading-7">
            <ReloadIcon className="w-5 h-5 animate-spin" />
            Memuat data...
          </p>
        )}
        {!isLoading && (
          <Form {...form}>
            <form onSubmit={() => {}} className="space-y-8">
              <FormField
                control={form.control}
                name="namaRuangan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Buku</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggalPinjam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Pinjam</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggalKembali"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Kembali</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keterangan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Kembali</FormLabel>
                    <FormControl>
                      <Textarea disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="namaPeminjam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Peminjam</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
