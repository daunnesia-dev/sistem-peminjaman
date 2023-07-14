import { z } from "zod";

export const createBooksProps = z.object({
  id: z.number(),
  coverImage: z
    .string()
    .nonempty({ message: "Gambar sampul tidak boleh kosong" }),
  judul: z
    .string()
    .nonempty({ message: "Judul tidak boleh kosong" })
    .max(50, { message: "Judul maksimal 50 karakter" }),
  sinopsis: z
    .string()
    .nonempty({ message: "Sinopsis tidak boleh kosong" })
    .max(500, { message: "Sinopsis maksimal 500 karakter" }),
  tahun: z
    .number()
    .min(1, { message: "Tahun minimal 1" })
    .max(new Date().getFullYear(), { message: "Tahun maksimal tahun ini" }),
  penerbit: z
    .string()
    .nonempty({ message: "Penerbit tidak boleh kosong" })
    .max(50, { message: "Penerbit maksimal 50 karakter" }),
  lokasi: z
    .string()
    .nonempty({ message: "Lokasi tidak boleh kosong" })
    .max(50, { message: "Lokasi maksimal 50 karakter" }),
  stok: z.number().min(0, { message: "Stok minimal 0" }),
});

export const ApiBooksUpdateRequestValidator = z.any();

export const bookFormSchema = z.any();
export const ApiBooksRequestValidator = bookFormSchema;

export const ApiBooksResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createBooksProps),
});

export const ApiBooksDeleteResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.string(),
});

export type BooksProps = z.infer<typeof createBooksProps>;
