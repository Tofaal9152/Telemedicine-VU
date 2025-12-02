import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

// Routes accessible without authentication
const publicRoutes = ["/", "/ambulance", "/auth/signin", "/auth/signup"];

export async function proxy(req: NextRequest) {
  const session = await getSession(); 
  const user = session?.user;
  const isAdmin = user?.role === "ADMIN";
  const { pathname } = req.nextUrl;
  const isDashboard = pathname.startsWith("/dashboard");

  /* ── 1. Unauthenticated users ───────────────────────── */
  if (!session && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  /* ── 2. Auth pages are for guests only ──────────────── */
  if (session && ["/auth/signin", "/auth/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  /* ── 3. Admin rules ─────────────────────────────────── */
  if (isAdmin) {
    if (!isDashboard) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next(); // allow access to /dashboard/*
  }

  /* ── 4. Patient/Doctor cannot access /dashboard ─────── */
  if (isDashboard) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next(); // all other routes
}

/* Skip static assets, images, favicon, and API routes */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

// import { NextRequest, NextResponse } from "next/server";
// import { getSession } from "@/lib/session";

// const publicAuthRoutes = ["/auth/signin", "/auth/signup"];

// export async function middleware(req: NextRequest) {
//   const session   = await getSession();          // pass req if your helper expects it
//   const user      = session?.user;
//   const isAdmin   = user?.role === "ADMIN";
//   const { pathname } = req.nextUrl;
//   const isDashboard = pathname.startsWith("/dashboard");

//   /* ── 1. Un‑authenticated ─────────────────────────────── */
//   if (!session && !publicAuthRoutes.includes(pathname))
//     return NextResponse.redirect(new URL("/auth/signin", req.url));

//   /* ── 2. Auth pages are for guests only ───────────────── */
//   if (session && publicAuthRoutes.includes(pathname))
//     return NextResponse.redirect(new URL("/", req.url));

//   /* ── 3. Admin rules ──────────────────────────────────── */
//   if (isAdmin) {
//     // Anything outside /dashboard* pushes the admin back to the dashboard
//     if (!isDashboard)
//       return NextResponse.redirect(new URL("/dashboard", req.url));

//     // Inside /dashboard* is fine
//     return NextResponse.next();
//   }

//   /* ── 4. Patient/Doctor rules ─────────────────────────── */
//   if (isDashboard)          // trying to open /dashboard or /dashboard/*
//     return NextResponse.redirect(new URL("/", req.url));

//   return NextResponse.next();
// }

// /* Skip static assets, images, favicon, and API routes */
// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
// };
