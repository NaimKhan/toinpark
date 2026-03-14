import { TString } from "@/store/api/common-api-types";
import { compareDateTimes } from "@/lib/date-time/compareDateTimes";

export const parseJwt = (token: TString) => {
  if (!token) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export function getExpirationTime(token: TString) {
  const payload = parseJwt(token);
  return new Date(payload.exp * 1000);
}

export function isTokenExpired(
  expiresAt: Date | string | null | undefined
): boolean {
  if (!expiresAt) {
    return false;
  }

  const comparison = compareDateTimes({
    providedDateTime: expiresAt,
    comparisonUnit: "seconds",
  });

  // If status is not "after", it means current time is >= expiration time (expired)
  return comparison?.status !== "after";
}

export function isRefreshTokenExpired(
  refreshExpiresAt: Date | string | null | undefined
): boolean {
  return isTokenExpired(refreshExpiresAt);
}

export function isAccessTokenExpired(
  accessExpiresAt: Date | string | null | undefined
): boolean {
  return isTokenExpired(accessExpiresAt);
}
