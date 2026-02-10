import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Admin routes protection
    if (pathname.startsWith("/aidx-odn/admin")) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/aidx-odn", req.url));
      }
    }

    // Submit route requires authentication
    if (pathname.startsWith("/aidx-odn/submit")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Public routes - accessible without authentication
        if (
          pathname === "/aidx-odn" ||
          pathname.startsWith("/aidx-odn/post/")
        ) {
          return true;
        }

        // API routes for reading posts are public
        if (
          pathname.startsWith("/api/community/posts") &&
          req.method === "GET"
        ) {
          return true;
        }

        // Protected routes require token
        if (
          pathname.startsWith("/aidx-odn/submit") ||
          pathname.startsWith("/aidx-odn/admin")
        ) {
          return !!token;
        }

        // Default: allow access
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/aidx-odn/:path*", "/api/community/:path*"],
};
