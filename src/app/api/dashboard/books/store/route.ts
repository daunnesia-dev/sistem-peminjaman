import { db } from "@/lib/db";
import { ApiBooksRequestValidator } from "@/lib/validator/dashboard/books/api";
import { ApiRoomsRequestValidator } from "@/lib/validator/dashboard/rooms/api";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const role = user?.publicMetadata.role;
  const body = await req.json();
  if (role === "admin") {
    try {
      const {
        coverImage,
        judul,
        sinopsis,
        tahun,
        penerbit,
        penulis,
        stok,
        category,
      } = ApiBooksRequestValidator.parse(body);
      const intTahun = parseInt(tahun);
      const intStok = parseInt(stok);
      const intCategory = parseInt(category);
      const books = await db.book.create({
        data: {
          coverImage,
          judul,
          sinopsis,
          tahun: intTahun,
          penerbit,
          penulis,
          stok: intStok,
          categoryId: intCategory,
        },
      });

      return NextResponse.json(
        {
          error: null,
          data: books,
        },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }
  } else {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
};
