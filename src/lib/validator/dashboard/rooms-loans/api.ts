import { z } from "zod";

export const createRoomsLoansProps = z.object({
  id: z.number(),
  namaRuangan: z.string(),
  tanggalPinjam: z.string(),
  tanggalKembali: z.string(),
  namaPeminjam: z.string(),
  status: z.number(),
});
export const ApiRoomsLoansUpdateRequestValidator = createRoomsLoansProps;
export const updateRoomsLoansAdminProps = z.object({
  id: z.number(),
  status: z.number(),
});
export const ApiRoomsLoansAdminUpdateRequestValidator =
  updateRoomsLoansAdminProps;

export const roomLoansFormSchema = z.object({
  roomId: z.number(),
  tanggalPinjam: z.string(),
  tanggalKembali: z.string(),
  keterangan: z.string(),
});
export const ApiRoomsLoansRequestValidator = roomLoansFormSchema;

export const ApiRoomsLoansResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createRoomsLoansProps),
});

export const ApiRoomsLoansDeleteResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.string(),
});

export type RoomsLoansProps = z.infer<typeof createRoomsLoansProps>;
