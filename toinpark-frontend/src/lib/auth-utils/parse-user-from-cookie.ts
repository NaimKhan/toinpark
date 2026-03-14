import {
  isAccessTokenExpired as checkAccessTokenExpired,
  isRefreshTokenExpired as checkRefreshTokenExpired,
} from "./jwt";

export type TParseUserFromCookieResult = {
  userRole: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  isAccessTokenExpired: boolean;
  isRefreshTokenExpired: boolean;
};

export function parseUserFromCookie(
  cookieValue: string | null | undefined
): TParseUserFromCookieResult | undefined {
  if (!cookieValue) {
    return undefined;
  }

  try {
    const authInfo = JSON.parse(cookieValue);
    return {
      userRole: authInfo?.user?.role || authInfo?.user?.userRole,
      accessToken: authInfo?.accessToken,
      refreshToken: authInfo?.refreshToken,
      isAccessTokenExpired: checkAccessTokenExpired(authInfo?.accessExpiresAt),
      isRefreshTokenExpired: checkRefreshTokenExpired(authInfo?.refreshExpiresAt),
    };
  } catch (error) {
    console.error("Error parsing authInfo cookie:", error);
    return undefined;
  }
}
