import { z } from "zod";

export const ApiAdminResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.object({
    books_count: z.number(),
    rooms_count: z.number(),
    books_loans_count: z.number(),
    rooms_loans_count: z.number(),
  }),
});

export const ApiMemberResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.object({
    books_loans_count: z.number(),
    rooms_loans_count: z.number(),
  }),
});
