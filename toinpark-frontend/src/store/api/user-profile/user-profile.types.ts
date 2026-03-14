import {
  TApiResponse,
  TMedia,
  TNumber,
  TString,
  TUpdateOptionalArgs,
} from "../common-api-types";

/**
|--------------------------------------------------
| Shared Base Types
|--------------------------------------------------
*/

export type TBaseLocationMeta = {
  id: TString;
  name?: TString;
  code?: TString;
  isActive?: boolean;
  createdAt?: TString;
  updatedAt?: TString;
  createdBy?: TString;
  deletedAt?: TString;
  deletedBy?: TString;
  updatedBy?: TString;
};

/**
|--------------------------------------------------
| Country & State Types
|--------------------------------------------------
*/

export type TCountry = TBaseLocationMeta & {
  phoneCode?: TString;
  currencyCode?: TString;
};

export type TState = TBaseLocationMeta & {
  countryId?: TString;
};

export type TUserBase = {
  firstName?: TString;
  lastName?: TString;
  phoneNumber?: TString;
  addressLine1?: TString;
  city?: TString;
  zipCode?: TString;
  profileImageUrl?: TString;
  media?: TMedia;
};

/**
|--------------------------------------------------
| Get User Profile Start
|--------------------------------------------------
*/

export type TUserProfile = TUserBase & {
  id: TString;
  fullName: TString;
  email: TString;
  userId: TString;
  toinAccountNumber: TString;
  walletBalance: TNumber;
  country: TCountry;
  state: TState;
  role: TString;
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
};

export type TGetUserProfileArgs = void;
export type TGetUserProfileRes = TApiResponse<TUserProfile>;

/**
|--------------------------------------------------
| Get User Profile End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get User Phone Or Email Otp Verify Start
|--------------------------------------------------
*/
export type TVerifyResp = {
  uniqueKey: string;
  identifier: string;
  emailOrPhone: string;
};

export type TIdentifier = {
  emailOrPhone?: string;
};

export type TGetPhoneOrEmailOtpVerifyArgs = TIdentifier;
export type TGetPhoneOrEmailOtpVerifyRes = TApiResponse<TVerifyResp>;

/**
|--------------------------------------------------
| Get User Phone Or Email Otp Verify  End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Verify User Phone Or Email 1st Step Start
|--------------------------------------------------
*/
export type TOtpVerificationArgs = {
  otpUniqueKey: string;
  otp: string;
};

export type TPhoneOrEmailFirstOtpValidationArgs = TOtpVerificationArgs;
export type TPhoneOrEmailFirstOtpValidationRes = TApiResponse<TVerifyResp>;

/**
|--------------------------------------------------
|  Verify User Phone Or Email 1st Step End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Change User Profile Password Start
|--------------------------------------------------
*/
export type TChangeUserPassword = {
  currentPassword: TString;
  newPassword: TString;
  confirmPassword: TString;
};

export type TChangeUserPasswordArgs = TChangeUserPassword;
export type TChangeUserPasswordRes = TApiResponse;
/**
|--------------------------------------------------
| Change User Profile Password End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update User Profile Start
|--------------------------------------------------
*/
export type TUpdateProfile = Omit<TUserBase, "phoneNumber"> & {
  addressLine2?: TString;
  toinAccountNumber?: TString;
  countryId?: TString;
  stateId?: TString;
  bio?: TString;
};
export type TUpdateUserProfileArgs = TUpdateOptionalArgs<TUpdateProfile>;
export type TUpdateUserProfileRes = TApiResponse<TUserProfile>;

/**
|--------------------------------------------------
| Update User Profile End
|--------------------------------------------------
*/

// =============================
// UPLOAD PROFILE IMAGE TYPES
// =============================

export type TUploadProfileImgArgs = {
  body: FormData;
};

export type TUploadProfileImgRes = {
  success: boolean;
  message: TString;
  statusCode: number;
  data: TString;
  timestamp: TString;
};

// =============================
// DELETE PROFILE IMAGE TYPES
// =============================
export type TDeleteProfileImgArgs = void;

export type TDeleteProfileImgRes = TUploadProfileImgRes;
