import { NextResponse } from "next/server";

export async function middleware(req) {
  const user = false
  if(!user) {
    const response = NextResponse.redirect(new URL("/sign-in", req.url));
    return response;
  }
  console.log('middleware');
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/welcome",
    "/search-results",
  ],
};
