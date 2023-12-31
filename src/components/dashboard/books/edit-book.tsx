/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { useToast } from "@/ui/use-toast";
import { charCounter } from "@/helpers/char-counter";
import { detailBooks } from "@/helpers/dashboard/books/detail-books";
import { updateBooks } from "@/helpers/dashboard/books/update-books";
import { getCategories } from "@/helpers/dashboard/categories/get-categories";
import { cn } from "@/lib/utils";
import { bookFormSchema, yearNow } from "@/lib/validator/dashboard/books/api";
import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedValue } from "@mantine/hooks";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageUploader from "./image-uploader";
import { getBookLocations } from "@/helpers/dashboard/book-locations/get-book-locations";

interface HandleChangeProps {
  e: React.ChangeEvent<HTMLTextAreaElement>;
  name:
    | "coverImage"
    | "judul"
    | "sinopsis"
    | "tahun"
    | "penerbit"
    | "penulis"
    | "stok"
    | "lokasiBuku"
    | "category";
  limit: number;
  setState: any;
}

const EditBook = ({ id }: { id: number }) => {
  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      coverImage: "",
      judul: "",
      sinopsis: "",
      tahun: "",
      penerbit: "",
      penulis: "",
      stok: "",
      lokasiBuku: "",
      category: "",
    },
  });
  const {
    data: dataCategories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = getCategories();
  const {
    data: dataLokasi,
    isLoading: isLoadingLokasi,
    error: errorLokasi,
  } = getBookLocations();
  const [categories, setCategories] = useState([{ id: "", name: "" }]);
  const [categoryId, setCategoryId] = useState("");
  const [lokasiBuku, setLokasiBuku] = useState([{ id: "", name: "" }]);
  const [lokasiBukuId, setLokasiBukuId] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [debounced] = useDebouncedValue(sinopsis, 200);
  const { data, isLoading, error } = detailBooks(id);
  const {
    isSuccess: isUpdateSuccess,
    mutate: updateMutate,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = updateBooks();
  const { toast } = useToast();
  const router = useRouter();

  const handleChange = ({ e, name, limit, setState }: HandleChangeProps) => {
    const inputValue = e.target.value;
    if (inputValue.length <= limit) {
      setState(inputValue);
      form.setValue(name, inputValue);
    } else {
      setState(inputValue.slice(0, limit));
      form.setValue(name, inputValue.slice(0, limit));
    }
  };

  useEffect(() => {
    if (dataCategories) {
      setCategories(dataCategories);
    }

    if (errorCategories) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data kategori buku",
      });
    }
  }, [dataCategories, errorCategories]);

  useEffect(() => {
    if (dataLokasi) {
      setLokasiBuku(dataLokasi);
    }

    if (errorLokasi) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data lokasi buku",
      });
    }
  }, [dataLokasi, errorLokasi]);

  useEffect(() => {
    if (coverImage !== "") {
      form.setValue("coverImage", coverImage);
    }
  }, [coverImage, form]);

  useEffect(() => {
    if (data) {
      form.setValue("coverImage", data.coverImage);
      setCoverImage(data.coverImage);
      form.setValue("judul", data.judul);
      form.setValue("sinopsis", data.sinopsis);
      setSinopsis(data.sinopsis);
      form.setValue("tahun", data.tahun.toString());
      form.setValue("penerbit", data.penerbit);
      form.setValue("penulis", data.penulis);
      form.setValue("stok", data.stok.toString());
      form.setValue("lokasiBuku", data.locationId.toString());
      setLokasiBukuId(data.locationId.toString());
      form.setValue("category", data.categoryId.toString());
      setCategoryId(data.categoryId.toString());
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengambil detail data buku",
      });
    }
  }, [data, error, setCoverImage, setSinopsis, form]);

  function onSubmit(values: z.infer<typeof bookFormSchema>) {
    updateMutate({ id, ...values });
  }

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Success",
        description: "Buku berhasil diperbarui",
      });
      router.push("/dashboard/books");
    }

    if (isUpdateError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat memperbarui buku",
      });
    }
  }, [isUpdateSuccess, isUpdateError]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Cover Buku
                <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div
                    className={cn(
                      "w-32 h-44 rounded-lg flex items-center justify-center",
                      coverImage !== ""
                        ? "bg-cover"
                        : "border-2 border-dashed border-gray-300 dark:border-gray-700"
                    )}
                    style={{
                      backgroundImage: `url(${
                        coverImage !== "" ? coverImage : ""
                      })`,
                    }}
                  >
                    {coverImage === "" && (
                      <span className="text-center text-gray-400 dark:text-gray-600">
                        Tidak ada gambar
                      </span>
                    )}
                  </div>
                  <ImageUploader setCoverImage={setCoverImage} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="judul"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Judul Buku
                <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder="ReactJS Untuk Pemula" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="penulis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nama Penulis
                <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 space-y-8 md:space-y-0 md:space-x-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="penerbit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama Penerbit
                  <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tahun"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tahun Terbit
                  <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={`${yearNow}`}
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="stok"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Stok Buku
                <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="20" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sinopsis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Sinopsis Buku
                <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <div className={cn("space-y-4")}>
                  <Textarea
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit dignissim lorem et laoreet. Maecenas ut rhoncus massa, eget sollicitudin risus. Praesent fermentum nulla aliquet, iaculis metus non, molestie nisl. Cras ultrices malesuada orci sit amet iaculis. Proin accumsan urna nec dolor cursus feugiat. Sed maximus felis non risus pharetra, sed fringilla enim pulvinar. Nam ultrices et massa sed blandit. Nullam non tincidunt ex, ut semper ligula. Vestibulum vel quam risus. Maecenas imperdiet nulla libero, a congue leo volutpat eu. Aliquam ut sem in leo consequat hendrerit ac ut mi. Donec tempor, orci sollicitudin ultrices pharetra, sem urna rhoncus quam, sit amet hendrerit lacus lorem et mauris. Donec varius enim ligula, vel efficitur felis porta vel. Aenean egestas pretium tincidunt. Nullam lacinia eleifend ipsum a aliquam. Pellentesque vitae semper magna. Suspendisse condimentum leo vitae erat eleifend consectetur. Cras ac nisi ante. Curabitur suscipit mi dui, eget massa nunc."
                    {...field}
                    value={sinopsis}
                    onChange={(e) =>
                      handleChange({
                        e,
                        name: "sinopsis",
                        limit: 10000,
                        setState: setSinopsis,
                      })
                    }
                    required
                  />
                  <div className="flex justify-start md:justify-end">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Sisa karakter {charCounter(debounced, 10000)}
                    </p>
                  </div>
                  <FormMessage />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lokasiBuku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Lokasi Buku
                <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <div className={cn("space-y-4")}>
                  {isLoadingLokasi && <p>Loading...</p>}
                  {!isLoadingLokasi && (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Lokasi Buku" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Lokasi</SelectLabel>
                          {lokasiBuku.map((lokasi) => (
                            <SelectItem
                              key={`lokasi-${lokasi.id}`}
                              value={lokasi.id.toString()}
                            >
                              {lokasi.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Kategori Buku
                <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <div className={cn("space-y-4")}>
                  {isLoading && <p>Loading...</p>}
                  {!isLoading && (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kategori Buku" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Kategori</SelectLabel>
                          {categories.map((category) => (
                            <SelectItem
                              key={`kategori-${category.id}`}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/books">Kembali</Link>
          </Button>
          <Button
            type="submit"
            disabled={isLoading || isLoadingCategories || isUpdateLoading}
          >
            {(isLoading || isLoadingCategories || isUpdateLoading) && (
              <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
            )}
            Perbarui
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditBook;
