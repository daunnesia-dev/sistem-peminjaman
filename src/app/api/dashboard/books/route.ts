import { db } from "@/lib/db";
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
      const books = await db.book.findMany({
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          coverImage: true,
          judul: true,
          sinopsis: true,
          tahun: true,
          penerbit: true,
          lokasi: true,
          stok: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      const response = {
        error: null,
        data: books.map((book) => ({
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
        })),
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
