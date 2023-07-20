import { db } from "@/lib/db";
import { ApiRoomsLoansRequestValidator } from "@/lib/validator/dashboard/rooms-loans/api";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: number;
    };
  }
) => {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const body: any = await req.json(); // Update this line to use req.json()

    const findBookLoans = await db.loanRoom.findFirst({
      where: {
        id: body.id,
      },
      include: {
        room: true,
      },
    });

    if (!findBookLoans) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }

    const updateRoomLoans = await db.loanRoom.update({
      where: {
        id: body.id,
      },
      data: {
        keterangan: body.keterangan,
        end: body.tanggalKembali,
      },
    });

    return NextResponse.json({
      error: null,
      data: updateRoomLoans,
    });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
