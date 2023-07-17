import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body: any = await req.json();
  const role = user.publicMetadata?.role;

  if (role === "admin") {
    try {
      const findStatus = await db.statuses.findFirst({
        where: {
          keterangan: "Direview",
        },
      });

      // start of error disini
      const updatedLoanRoom = await db.loanRoom.update({
        where: { id: parseInt(body.roomLoanId) },
        data: { statusId: findStatus?.id },
      });
      // end of error disini

      return NextResponse.json(
        {
          error: null,
          data: updatedLoanRoom,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }
  } else {
    return NextResponse.json("Forbidden", { status: 403 });
  }
};
