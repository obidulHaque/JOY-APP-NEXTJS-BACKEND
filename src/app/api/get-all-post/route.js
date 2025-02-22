import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const posts = await prisma.posts.findMany({
      orderBy: { id: "desc" },
      skip: (page - 1) * 10,
      take: limit,
    });
    const totalPosts = await prisma.posts.count();

    return NextResponse.json(
      { posts, totalPage: Math.ceil(totalPosts / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
};
