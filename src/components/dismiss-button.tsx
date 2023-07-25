"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function DismissButton() {
  const router = useRouter();

  return (
    <button
      className="text-blue-600 underline contents"
      onClick={() => {
        Cookies.set("get-started-daunnesia", "true");
        router.refresh();
      }}
    >
      Dismiss →
    </button>
  );
}
