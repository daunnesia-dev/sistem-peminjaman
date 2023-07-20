/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Textarea } from "@/components/ui/textarea";
import { updateRoomsLoans } from "@/helpers/dashboard/rooms-loans/update-rooms-loans";
import { updateDetailRoomsLoans } from "@/helpers/dashboard/rooms-loans/update-detail-rooms-loans";
import { cn } from "@/lib/utils";
import { bookLoansFormSchema } from "@/lib/validator/dashboard/book-loans/api";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { useToast } from "@/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function EditButton({ id }: { id: number }) {
  const form = useForm<z.infer<any>>({
    // resolver: zodResolver(bookLoansFormSchema),
    defaultValues: {
      name: "",
      tanggalPinjam: new Date(),
      keterangan: "",
    },
  });
  const [tanggalKembali, setTanggalKembali] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const {
    data,
    isLoading,
    error,
  }: {
    data: any;
    isLoading: boolean;
    error: any;
  } = updateDetailRoomsLoans(id, isOpen);
  const {
    isSuccess: isUpdateSuccess,
    mutate: updateMutate,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = updateRoomsLoans();
  const { toast } = useToast();

  useEffect(() => {
    if (tanggalKembali) {
      form.setValue("tanggalKembali", tanggalKembali);
    }
  }, [tanggalKembali, form]);

  useEffect(() => {
    if (data) {

      console.log(data)
      form.setValue("name", data.room.name);
      form.setValue("tanggalPinjam", new Date(data.start));
      setTanggalKembali(new Date(data.end));
      form.setValue("tanggalKembali", new Date(data.end));
      form.setValue("keterangan", data.keterangan);
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data detail ruangan",
      });
      form.reset();
      setIsOpen(false);
    }
  }, [data, error, form]);

  function onSubmit(values: z.infer<any>) {
    updateMutate({ id, ...values });
  }

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Success",
        description: "Peminjaman ruangan berhasil diperbarui",
      });
      setIsOpen(false);
    }

    if (isUpdateError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat memperbarui peminjaman ruangan",
      });
    }
  }, [isUpdateSuccess, isUpdateError]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem className={cn("hover:cursor-pointer")}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-slate-50">
        <DialogHeader>
          <DialogTitle>Edit Pinjam Ruangan</DialogTitle>
        </DialogHeader>
        {isLoading && (
          <p className="flex items-center gap-2 space-x-2 leading-7">
            <ReloadIcon className="w-5 h-5 animate-spin" />
            Memuat data...
          </p>
        )}
        {!isLoading && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nama Ruangan
                      <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                        *
                      </span>
                    </FormLabel>
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
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Tanggal Pinjam
                      <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                        *
                      </span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled
                          >
                            {field.value ? (
                              format(field.value, "dd MMMM yyyy", {
                                locale: idLocale,
                              })
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          disabled
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggalKembali"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Tanggal Kembali
                      <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                        *
                      </span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd MMMM yyyy", {
                                locale: idLocale,
                              })
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={tanggalKembali}
                          onSelect={setTanggalKembali}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keterangan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Keterangan
                      <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading || isUpdateLoading}>
                  {(isLoading || isUpdateLoading) && (
                    <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                  )}
                  Perbarui
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
