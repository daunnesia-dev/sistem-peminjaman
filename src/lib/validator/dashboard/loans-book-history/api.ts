import { z } from "zod";

export const createLoansBoookProps = z.object({
  id: z.string(),
  judul: z.string(),
  jumlah: z.number(),
  tanggalPinjam: z.string(),
  tanggalKembali: z.string(),
  namaPeminjam: z.string(),
});

export const ApiLoansBookResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createLoansBoookProps),
});

export type LoansBoookProps = z.infer<typeof createLoansBoookProps>;
