import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("API_KEY from env:", process.env.API_KEY); // Log the API_KEY

  const Key = req.headers.get("app-key");
  console.log("Received App Key:", Key); // Log the request header

  if (!Key || Key !== process.env.API_KEY) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*", // Apply to all API routes
};
