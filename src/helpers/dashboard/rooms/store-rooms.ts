import { roomFormSchema } from "@/lib/validator/dashboard/rooms/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const storeRooms = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(async (newData: z.infer<typeof roomFormSchema>) => {
    const { data } = await axios.post("/api/dashboard/rooms/store", newData, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
    return data.data;
  });
};
