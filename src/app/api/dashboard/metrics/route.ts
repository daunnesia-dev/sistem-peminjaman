import { db } from "@/lib/db";
import {
  ApiAdminResponseValidator,
  ApiMemberResponseValidator,
} from "@/lib/validator/dashboard/metrics/api";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const role = user?.publicMetadata.role;

  if (role === "admin") {
    try {
      const books_count = await db.book.count();
      const rooms_count = await db.room.count();
      const books_loans_count = await db.loanBook.count();
      const rooms_loans_count = await db.loanRoom.count();
      const response = ApiAdminResponseValidator.parse({
        error: null,
        data: {
          books_count,
          rooms_count,
          books_loans_count,
          rooms_loans_count,
        },
      });

      return NextResponse.json(response);
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
  } else {
    try {
      const books_loans_count = await db.loanBook.count({
        where: { userId: user.id },
      });
      const rooms_loans_count = await db.loanRoom.count({
        where: { userId: user.id },
      });
      const response = ApiMemberResponseValidator.parse({
        error: null,
        data: {
          books_loans_count,
          rooms_loans_count,
        },
      });

      return NextResponse.json(response);
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
  }
};
