import { TNullish } from "../common-api-types";

export type TKycTypeOf = "email" | "phone";

export type TKycSendOtpArgs = {
  typeOf: TKycTypeOf;
};

export type TKycOldVerifyArgs = {
  otpUniqueKey: string;
  otp: string;
};

// Response data for Step 1 verification (usually returns a logId string)
export type TKycOldVerifyResData = string;

export type TKycNewIdentityReceivedArgs = {
  logId: string | TNullish;
  newEmailOrPhone: string;
};

export type TKycNewIdentityReceivedResData = {
  uniqueKey: string;
};

export type TKycNewIdentityVerifiedArgs = {
  otpUniqueKey: string;
  otp: string;
};

export type TKycLogsArgs = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
