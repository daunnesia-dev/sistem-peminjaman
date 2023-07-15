import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getLoansBookHistory = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["loans-book-history"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/loans-book-history", {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
