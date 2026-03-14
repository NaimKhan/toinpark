import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "@/config/config";
import { parseUserFromCookie } from "./lib/auth-utils/parse-user-from-cookie";
import {
  isPublicRoute,
  getRouteOwner,
  getDefaultDashboardRoute,
  isValidRouteForRole,
  normalizeUserRole,
} from "./lib/auth-utils/route-owner";

const extractLocale = (pathname: string): string => {
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  return pathnameHasLocale ? pathname.split("/")[1] : locales[0];
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = extractLocale(pathname);
  const isRootPath = pathname === `/${locale}` || pathname === "/";

  // 1. PUBLIC ROUTES: Always allow access regardless of authentication state
  // This ensures users can always reach login/signup even if already logged in as another role
  if (isPublicRoute(pathname)) {
    // SPECIAL CASE: For admin-login, if already logged in as Admin, redirect to admin dashboard
    if (pathname.includes("/admin-login")) {
      const adminCookie = request.cookies.get("authinfo-Admin") || request.cookies.get("authinfo-SuperAdmin");
      const parsedAdmin = parseUserFromCookie(adminCookie?.value);
      if (parsedAdmin?.accessToken && !parsedAdmin.isAccessTokenExpired && !parsedAdmin.isRefreshTokenExpired) {
        return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
      }
    }
    return createMiddleware({ locales, defaultLocale: "en" })(request);
  }

  // Determine which role's cookie to look for based on the requested route
  const routeRoleOwner = getRouteOwner(pathname);
  
  // Also check if we have any active session at all
  const adminCookie = request.cookies.get("authinfo-Admin") || request.cookies.get("authinfo-SuperAdmin");
  const memberCookie = request.cookies.get("authinfo-Member");

  // Prioritize the cookie based on the route owner
  let preferredCookie = null;
  if (routeRoleOwner === "Admin") {
    preferredCookie = adminCookie;
  } else if (routeRoleOwner === "Member") {
    preferredCookie = memberCookie;
  } else {
    // For root path or other non-attributed routes, pick any existing session
    preferredCookie = memberCookie || adminCookie;
  }

  const parsedUser = parseUserFromCookie(preferredCookie?.value);

  const {
    userRole: rawUserRole,
    accessToken,
    isAccessTokenExpired,
    isRefreshTokenExpired,
  } = parsedUser ?? {};

  const userRole = normalizeUserRole(rawUserRole);
  const isAuthenticated =
    !!accessToken && !isAccessTokenExpired && !isRefreshTokenExpired;

  // 2. UNAUTHENTICATED: Only allow root path (landing/login) or redirect to root
  if (!isAuthenticated) {
    if (isRootPath) {
      return createMiddleware({ locales, defaultLocale: "en" })(request);
    }
    // Redirect to login (root)
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // 3. AUTHENTICATED: Handle role-based redirects and access control
  if (userRole) {

    // Redirect from root to role-based dashboard
    if (isRootPath) {
      // ONLY redirect members away from root.
      // Admins are allowed to see root (landing/login) so they can login as a member.
      if (userRole === "Member") {
        const dashboardUrl = getDefaultDashboardRoute(userRole, locale);
        return NextResponse.redirect(new URL(dashboardUrl, request.url));
      }
      // For Admins, we proceed with i18n routing to the landing page
      return createMiddleware({ locales, defaultLocale: "en" })(request);
    }

    // Check if route is valid for user's role
    if (!isValidRouteForRole(pathname, userRole)) {
      const routeOwner = getRouteOwner(pathname);

      // If they are logged in as the other role, we've already tried to pick the right cookie.
      // If we're still here, it means they don't have a session for the requested route.
      if (routeOwner && routeOwner !== userRole) {
        const dashboardUrl = getDefaultDashboardRoute(userRole, locale);
        return NextResponse.redirect(new URL(dashboardUrl, request.url));
      }
    }

    // Allow access - proceed with i18n routing
    return createMiddleware({ locales, defaultLocale: "en" })(request);
  }

  // Fallback: handle i18n routing
  return createMiddleware({ locales, defaultLocale: "en" })(request);
}

export const config = {
  matcher: ["/", "/(en|fr|de)/:path*"],
};
