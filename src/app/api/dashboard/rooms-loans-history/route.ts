import { db } from "@/lib/db";
import { ApiRoomsResponseValidator } from "@/lib/validator/dashboard/rooms/api";
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
      const rooms = await db.loanRoom.findMany({
        orderBy: {
          createdAt: "asc",
        },
        include: {
          room: true,
          user: true,
        },
      });
      const response = {
        error: null,
        data: [
          ...rooms.map((room) => {
            return {
              ...room,
              isDone: room.isDone == true ? "Ya" : "Tidak",
              start: new Date(room.start).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                weekday: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }),
              end: new Date(room.end).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                weekday: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }),
              createdAt: new Date(room.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                weekday: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }),
              updatedAt: new Date(room.updatedAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                weekday: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }),
            };
          }),
        ],
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
