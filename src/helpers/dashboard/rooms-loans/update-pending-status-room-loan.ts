/* eslint-disable react-hooks/rules-of-hooks */
import { roomLoansFormSchema } from "@/lib/validator/dashboard/rooms-loans/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const updatePendingStatusRoomLoan = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<any>) => {
      const { data } = await axios.put(
        "/api/dashboard/rooms-loans/update/review-room-loan",
        newData,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
      return data.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["roomsLoans"],
        });
      },
    }
  );

  return mutation;
};
