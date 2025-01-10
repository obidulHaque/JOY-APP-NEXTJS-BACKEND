
import { NextResponse } from "next/server";

export function middleware(req) {
  const allowedKey = process.env.API_KEY;

  // Handle preflight (OPTIONS) requests
  if (req.method === "OPTIONS") {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, app-key");
    return response;
  }

  // Validate `app-key` for other requests
  
  const Key = req.headers.get("app-key");   
  console.log(Key)
  
  if (Key !== allowedKey) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  // Allow request to proceed
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, app-key");
  return response;
}

export const config = {
  matcher: "/api/:path*", // Apply to all API routes
};

