import { ApiRoomsLoansResponseValidator } from "@/lib/validator/dashboard/rooms-loans/api";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const rooms = await db.room.findMany({
      where: {
        tersedia: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    const response = ApiRoomsLoansResponseValidator.parse({
      error: null,
      data: rooms,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
          data: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error", data: null },
      { status: 500 }
    );
  }
};
