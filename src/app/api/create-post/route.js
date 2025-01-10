import uploadToCloudinary from "@/lib/uploadCloudinary";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image =await formData.get("image");
    const video =await formData.get("video");
    const title = formData.get("title");
    const prompt = formData.get("prompt");
    console.log(image, video, title, prompt);
    const imageUrl = await uploadToCloudinary(image, "next image");
    const videoUrl = await uploadToCloudinary(video, "next video");
    console.log(imageUrl.secure_url, videoUrl.secure_url);

    return NextResponse.json(
      { message: "upload succesfully do.." },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Error uploading image" },
      { status: 500 }
    );
  }
}
