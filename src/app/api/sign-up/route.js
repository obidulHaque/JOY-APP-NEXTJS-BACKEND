import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const emailExists = await prisma.users.findUnique({
      where: { email },
    });

    if (emailExists) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        avatar,
      },
    });

    return NextResponse.json(
      {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          avatar: avatar,
        },
        message: "Sign-up successful",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { message: "An error occurred during sign-up" },
      { status: 500 }
    );
  }
};
