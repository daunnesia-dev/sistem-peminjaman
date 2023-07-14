import { z } from "zod";

const createUsersProps = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  role: z.string().nullable(),
  lastSignInAt: z.string(),
});

export const ApiUserListResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createUsersProps),
});

export type UsersProps = z.infer<typeof createUsersProps>;
