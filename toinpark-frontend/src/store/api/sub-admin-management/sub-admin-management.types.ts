import {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNumber,
  TPaginationArgs,
  TPaginationMeta,
  TString,
  TUpdateOptionalArgs,
} from "../common-api-types";
import { TUserProfile } from "../user-profile/user-profile.types";

export type TCreateSubAdmin = {
  email: TString;
  firstName: TString;
  lastName: TString;
  userName: TString;
  password?: TString;
  passwordConfirmation?: TString;
};

export enum SubAdminStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  BLOCKED = "BLOCKED",
}

export type TSubAdminUserProfile = TUserProfile & {
  dateOfBirth?: TString;
  gender?: TString;
  bio?: TString;
  addressLine2?: TString;

  stateId?: TString;
  countryId?: TString;

  createdAt?: TString;
  createdBy?: TString;
  updatedAt?: TString;
  updatedBy?: TString;
  deletedAt?: TString;
  deletedBy?: TString;
};

export type TGetASubAdmin = TCreateSubAdmin & {
  id: TString;
  username: TString;
  phoneNumber: TString;
  emailVerified: boolean;
  phoneVerified: boolean;
  status: SubAdminStatus;
  userRole: TString;
  toinAccountNumber: TString;
  lastLoginAt: TString;
  lastLoginIp: TString;
  loginCount: TNumber;
  twoFactorEnabled: boolean;
  createdAt: TString;
  updatedAt: TString;
  userProfile: TSubAdminUserProfile;
  isActive: boolean;
};

/**
|--------------------------------------------------
| Create A Sub Admin Start
|--------------------------------------------------
*/
export type TCreateASubAdminArgs = TCreateSubAdmin;
export type TCreateASubAdminRes = TApiResponse<TGetASubAdmin>;
/**
|--------------------------------------------------
| Create A Sub Admin End
|--------------------------------------------------
*/
/**
|--------------------------------------------------
| Get All Sub Admin Start
|--------------------------------------------------
*/
export type TGetAllSubAdminData = {
  items: TGetASubAdmin[];
  meta: TPaginationMeta;
};

export type TGetSubAdminsArgs = TPaginationArgs;
export type TGetSubAdminsRes = TApiResponse<TGetAllSubAdminData>;

/**
|--------------------------------------------------
| Get All Sub Admin End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get A Sub Admin Start
|--------------------------------------------------
*/

export type TGetASubAdminArgs = TIdOrSlugOrIdentifier<"id">;
export type TGetASubAdminRes = TApiResponse<TGetASubAdmin>;

/**
|--------------------------------------------------
| Get A Sub Admin End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Sub Admin Start
|--------------------------------------------------
*/

export type TUpdateASubAdminArgs = TUpdateOptionalArgs<TCreateSubAdmin, "id">;
export type TUpdateASubAdminRes = TApiResponse<TGetASubAdmin>;

/**
|--------------------------------------------------
| Update A Sub Admin End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Sub Admin Status Start
|--------------------------------------------------
*/

export type TUpdateASubAdminStatusArgs = {
  id: string;
  status: SubAdminStatus;
};
export type TUpdateASubAdminStatusRes = TApiResponse<TGetASubAdmin>;

/**
|--------------------------------------------------
| Update A Sub Admin Status End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete A Sub Admin Start
|--------------------------------------------------
*/

export type TDeleteASubAdminArgs = TIdOrSlugOrIdentifier<"id">;
export type TDeleteASubAdminRes = TApiResponse<TGetASubAdmin>;

/**
|--------------------------------------------------
| Delete A Sub Admin End
|--------------------------------------------------
*/
