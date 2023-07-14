import { categoryFormSchema } from "@/lib/validator/dashboard/categories/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const storeCategory = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(async (newData: z.infer<typeof categoryFormSchema>) => {
    const { data } = await axios.post(
      "/api/dashboard/membership/store",
      newData,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
    return data.data;
  });
};
