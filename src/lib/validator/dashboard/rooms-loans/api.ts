import { z } from "zod";

export const createRoomsLoansProps = z.object({
  id: z.number(),
  namaRuangan: z.string(),
  tanggalPinjam: z.string(),
  tanggalKembali: z.string(),
  namaPeminjam: z.string(),
  status: z.string(),
});

export const ApiRoomsLoansResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createRoomsLoansProps),
});

export type RoomsLoansProps = z.infer<typeof createRoomsLoansProps>;
