import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    const userExist = await prisma.users.findFirst({
      where: { email },
    });

    if (!userExist) {
      return NextResponse.json(
        { message: "User doesn't exist" },
        { status: 400 }
      );
    }

    const verifyUser = await bcrypt.compare(password, userExist.password);
    if (!verifyUser) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", user: userExist },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Login problem", error: error.message },
      { status: 500 }
    );
  }
};
