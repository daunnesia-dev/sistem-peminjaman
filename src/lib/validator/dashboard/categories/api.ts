import { z } from "zod";

export const createCategoriesProps = z.object({
  id: z.string(),
  name: z.string(),
});

export const ApiCategoriesResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createCategoriesProps),
});

export const APICategoriesDeleteResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.string(),
});

export type CategoriesProps = z.infer<typeof createCategoriesProps>;
