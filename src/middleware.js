import { NextResponse } from "next/server";

export function middleware(req) {
  const allowedKey = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;

  // Handle preflight (OPTIONS) requests properly
  if (req.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, app-key"
    );
    return response;
  }

  // Validate `app-key`
  const Key = req.headers.get("app-key");
  console.log("Received App Key:", Key);

  if (!Key || Key !== allowedKey) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  // Allow request to proceed
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, app-key");
  return response;
}

export const config = {
  matcher: "/api/:path*", // Apply to all API routes
};
