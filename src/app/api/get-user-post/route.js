import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const getPost = await prisma.posts.findMany({ where: { userId } });
    return NextResponse.json({ getPost }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "internal error" }, { status: 500 });
  }
};
