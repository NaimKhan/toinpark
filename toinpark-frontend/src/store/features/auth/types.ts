import type { TSigninData } from "@/store/api/auth/auth.types";
import { EUserRole } from "@/store/api/auth/auth.types";
import type { TNullish } from "@/store/api/common-api-types";

export type TAuthInfo = Omit<TSigninData, "accessExpiresAt" | "refreshExpiresAt"> & {
  accessExpiresAt: Date | string | TNullish;
  refreshExpiresAt: Date | string | TNullish;
  role?: `${EUserRole}`;
};

export type TAuthState = {
  memberAuth: TAuthInfo | TNullish;
  adminAuth: TAuthInfo | TNullish;
};
