import { NextResponse } from "next/server";
import uploadToCloudinary from "@/lib/uploadCloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const video = formData.get("video");
    const result = await uploadToCloudinary(video, "xy");

    return NextResponse.json(
      { message: "Upload successful", url: result.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
