import type { TApiResponse, TNullish } from "../common-api-types";

export enum EVerificationMethod {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
}

export type TVerificationMethod = `${EVerificationMethod}`;

export enum EUserRole {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  Member = "Member",
}

export type TUserRole = `${EUserRole}`;

export enum EUserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  SUSPENDED = "SUSPENDED",
  DORMANT = "DORMANT",
  CLOSED = "CLOSED",
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
}
export type TUserStatus = `${EUserStatus}`;

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| User SignUp Start
|--------------------------------------------------
*/
export enum EUserSignUpType {
  EMAIL = "email",
  PHONE = "phone",
}

export type TUserSignUpType = `${EUserSignUpType}`;

export type TUserSignUpArgs = {
  identifierType: TUserSignUpType;
  identifier: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  referralCode: string;
};
export type TUserSignUpData = TUserSignUpArgs & {
  otpUniqueKey: string;
  addressLine1: string;
  city: string;
  stateId: string;
  countryId: string;
  zipCode: string;
};
export type TUserSignUpRes = TApiResponse<TUserSignUpData>;

/**
|--------------------------------------------------
| User SignUp End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Signin Start
|--------------------------------------------------
*/

export type TSigninArgs = {
  identifier: string;
  password: string;
};
export type TUser = {
  id: string;
  email: string;
  username: string;
  role: TUserRole;
};
export type TUserRes = {
  requiresVerification: boolean;
  verificationType: string;
  otpUniqueKey: string;
  hasRole: boolean;
  user: TUser;
};

export type TSigninData = {
  message: string | TNullish;
  accessToken: string | TNullish;
  accessExpiresAt: string | TNullish;
  refreshToken: string | TNullish;
  refreshExpiresAt: string | TNullish;
  user: TUser | TNullish;
};

export type TSigninRes = TApiResponse<TSigninData>;

/**
|--------------------------------------------------
| Signin End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */
/**
|--------------------------------------------------
| Verify OTP Start
|--------------------------------------------------
*/
export type TVerifyOtpArgs = {
  otpUniqueKey: string;
  otp: string;
};
export type TVerifyOtpRes = TApiResponse<TSigninData>;

/**
|--------------------------------------------------
| Verify OTP End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */
/**
|--------------------------------------------------
| Resend Otp Start
|--------------------------------------------------
*/
export type TResendOtpArgs = {
  otpUniqueKey: string;
};
export type TResendOtpRes = TApiResponse<TResendOtpArgs>;

/**
|--------------------------------------------------
| Resend OTP End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Auth Refresh Token Start
|--------------------------------------------------
*/

export type TRefreshTokenData = {
  accessToken: string | TNullish;
  accessExpiresAt: string | TNullish;
};

export type TRefreshTokenRes = TApiResponse<TRefreshTokenData>;

/**
|--------------------------------------------------
| Auth Refresh Token End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
/**
|--------------------------------------------------
| Signout Start
|--------------------------------------------------
*/

export type TSignoutArgs = void;
export type TSignoutRes = TApiResponse<null>;
/**
|--------------------------------------------------
| Signout End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Reset Password Start
|--------------------------------------------------
*/

export type TRequestPasswordResetArgs = {
  email?: string;
  phone?: string;
  type?: TUserSignUpType;
};

/**
|--------------------------------------------------
| Reset Password End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Forgot Password Start
|--------------------------------------------------
*/

export type TForgotPasswordArgs = {
  identifier: string;
};

export type TForgotPasswordRes = TApiResponse<{
  otpUniqueKey: string;
}>;

/**
|--------------------------------------------------
| Forgot Password End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Reset Password Start
|--------------------------------------------------
*/

export type TResetPasswordArgs = {
  otpUniqueKey: string;
  otp: string;
  newPassword: string;
  passwordConfirmation: string;
};

export type TResetPasswordRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Reset Password End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */
/**
|--------------------------------------------------
| Login with user id start
|--------------------------------------------------
*/

export type TLoginWithUserIdArgs = {
  userId: string;
};

export type TLoginWithUserIdRes = TApiResponse<TSigninData>;
/**
|--------------------------------------------------
| Login with user id end
|--------------------------------------------------
*/