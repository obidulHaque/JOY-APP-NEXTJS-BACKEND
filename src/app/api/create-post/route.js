import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.json();
    const { id, title, prompt, videoUrl, imageUrl, createBy, avatar } =
      formData;
    if (!id || !title || !prompt || !videoUrl || !imageUrl || !createBy) {
      return NextResponse.json(
        {
          message: "All Field required",
        },
        { status: 400 }
      );
    }

    await prisma.posts.create({
      data: {
        createBy,
        userId: id,
        title,
        prompt,
        videoUrl,
        imageUrl,
        avatar,
      },
    });

    return NextResponse.json(
      { message: "Post Creation successful." },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error :", error);
    return NextResponse.json({ error: "post creation fail" }, { status: 500 });
  }
}

export const DELETE = async (req) => {
  try {
    const body = await req.json();
    const { userId } = body;
    const postId = req.nextUrl.searchParams.get("postId");
    if (!userId) {
      return NextResponse.json(
        {
          message: "user not found ",
        },
        { status: 4000 }
      );
    }
    await prisma.posts.delete({ where: { userId, id: postId } });
    return NextResponse.json(
      { message: "post delete successfully done" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "unknown error" }, { status: 500 });
  }
};
