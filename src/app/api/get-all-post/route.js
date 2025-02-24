import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const searchParams = new URL(req.url).searchParams; // ✅ Fix: Proper way to access query params
    const page = parseInt(searchParams.get("page"), 10) || 1;
    const limit = parseInt(searchParams.get("limit"), 10) || 10;
    const search = searchParams.get("search") || "";

    let where = {};

    if (search.trim()) {
      const words = search.split(" ").filter(Boolean);
      where = {
        OR: words.map((word) => ({
          title: { contains: word, mode: "insensitive" }, // ✅ Fix: Match ANY word in title
        })),
      };
    }

    const posts = await prisma.posts.findMany({
      where,
      orderBy: { id: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPosts = await prisma.posts.count(); // ✅ Fix: Count only filtered posts

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
