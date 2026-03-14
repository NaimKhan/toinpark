import { type TUserRole } from "@/store/api/auth/auth.types";

export const publicRoutes = [
  "/auth",
  "/demo",
  "/error",
  "/errors",
  "/admin-login",
];

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const adminProtectedRoutes: RouteConfig = {
  patterns: [/\/admin/],
  exact: [],
};

export const memberProtectedRoutes: RouteConfig = {
  patterns: [/\/user/],
  exact: [],
};

export const isPublicRoute = (pathname: string): boolean => {
  return publicRoutes.some((route: string) => pathname.includes(route));
};

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (
    routes.exact.some((exact) => pathname === exact || pathname.endsWith(exact))
  ) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): TUserRole | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "Admin";
  }
  if (isRouteMatches(pathname, memberProtectedRoutes)) {
    return "Member";
  }
  return null;
};

export const getDefaultDashboardRoute = (
  role: TUserRole,
  locale: string
): string => {
  if (role === "Admin") {
    return `/${locale}/admin`;
  }
  if (role === "Member") {
    return `/${locale}/user/dashboard`;
  }
  return `/${locale}`;
};

// Get route without locale prefix (for use with next-intl router)
export const getDefaultDashboardRouteWithoutLocale = (
  role: TUserRole
): string => {
  if (role === "Admin") {
    return `/admin`;
  }
  if (role === "Member") {
    return `/user/dashboard`;
  }
  return `/`;
};

export const isValidRouteForRole = (
  pathname: string,
  role: TUserRole
): boolean => {
  const routeOwner = getRouteOwner(pathname);

  // Public routes are accessible to all
  if (isPublicRoute(pathname)) {
    return true;
  }

  // If route has no owner, allow access
  if (routeOwner === null) {
    return true;
  }

  // Check if route owner matches user role
  return routeOwner === role;
};

export const normalizeUserRole = (
  role: string | undefined
): TUserRole | null => {
  if (!role) {
    return null;
  }
  const normalized = role.trim();
  const upperNormalized = normalized.toUpperCase();

  // Handle Admin or SuperAdmin
  if (upperNormalized === "ADMIN" || upperNormalized === "SUPERADMIN") {
    return "Admin";
  }
  // Handle Member
  if (upperNormalized === "MEMBER") {
    return "Member";
  }
  return null;
};

// For use with next-intl router (doesn't include locale prefix)
export const getRoleBasedRedirectRoute = (
  role: string | undefined
): string => {
  const normalizedRole = normalizeUserRole(role);
  if (!normalizedRole) {
    return `/`;
  }
  return getDefaultDashboardRouteWithoutLocale(normalizedRole);
};
