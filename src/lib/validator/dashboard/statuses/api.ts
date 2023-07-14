import { z } from "zod";

export const createStatusesProps = z.object({
  id: z.number(),
  keterangan: z.string(),
});

export const ApiStatusesListResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createStatusesProps),
});

export const APIStatusesDeleteResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.string(),
});

export type StatusesProps = z.infer<typeof createStatusesProps>;
