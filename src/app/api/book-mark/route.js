import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const postId = req.nextUrl.searchParams.get("postId");
    const { userId } = body;
    if (!userId || !postId) {
      return NextResponse.json(
        {
          message: "All Field required",
        },
        { status: 400 }
      );
    }

    await prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
    });
    return NextResponse.json(
      {
        message: "Book Mark successfully done",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: "Book-Mark problem",
      },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: { post: true },
    });

    // Extract only the `post` objects from the bookmarks array
    const posts = bookmarks.map((bookmark) => bookmark.post);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  try {
    const body = await req.json();
    const { userId } = body;
    console.log(userId);
    const postId = req.nextUrl.searchParams.get("postId");

    const deleted = await prisma.bookmark.deleteMany({
      where: { userId, postId },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { message: "No bookmark found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Bookmark deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
