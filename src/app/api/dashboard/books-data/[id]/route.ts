import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  const id = parseInt(req.url.split("/")[req.url.split("/").length - 1]);

  const user = await currentUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const role = user?.publicMetadata.role;
  if (role === "user" || role === "admin") {
    try {
      const book = await db.book.findUnique({
        where: { id },
        include: {
          LoanBook: true,
        },
      });

      if (!book) {
        return NextResponse.json(
          { error: "Book not found", data: null },
          { status: 404 }
        );
      }

      const response = {
        error: null,
        data: {
          ...book,
          createdAt: new Date(book.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            weekday: "long",
            day: "numeric",
          }),
          updatedAt: new Date(book.updatedAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            weekday: "long",
            day: "numeric",
          }),
        },
      };
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
  } else {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
};
