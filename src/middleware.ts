import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get("better-auth.session_token"); // Check for session token

    const { pathname } = request.nextUrl;

    // Define paths that are always accessible (public assets, auth pages, api/auth)
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/images") ||
        pathname === "/favicon.ico" ||
        pathname.startsWith("/api/auth")
    ) {
        return NextResponse.next();
    }

    const publicPaths = ["/sign-in", "/sign-up", "/forgot-password"];
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    // If user is not authenticated and trying to access a protected route
    if (!sessionCookie && !isPublicPath) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Optional: Redirect authenticated users away from auth pages to dashboard?
    // For now, keeping it simple as requested: just protect the other pages.

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
