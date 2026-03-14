import { TUserSignUpData } from "../auth/auth.types";
import {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TPaginationArgs,
  TPaginationMeta,
  TString,
} from "../common-api-types";

export type TTimeStamp = {
  createdAt: TString;
  updatedAt: TString;
  deletedAt: TString;
};

export type TUserWallet = {
  id: TString;
  version: TString;
  userId: TString;
  walletBalance: number;
  totalStakingBonus: number;
  totalClaimBonus: number;
  totalEntryBonus: number;
  totalKycBonus: number;
  totalLevelingBonus: number;
  totalReferral: number;
  totalCommissionBonus: number;
  totalStaking: number;
  totalChallengeBonus: number;
  totalWithdrawals: number;
  totalRefund: number;
  totalVoid: number;
};

/**
 * Single Member
 */
export type TMember = TTimeStamp & {
  id: string;
  username: TString;
  email: TString;
  phoneNumber: TString | null;
  phoneVerifiedAt?: TString | null;
  emailVerified: boolean;
  emailVerifiedAt?: TString | null;
  status: string;
  userRole: TString;
  toinAccountNumber: TString;
  referralCode: TString;
  referrerId: TString | null;
  sponsorToinAccountNumber: TString | null;
  sponsorName?: TString | null;
  totalReferred: number;
  totalToinCredit: number;
  totalToinDebit: number;
  totalUsdtCredit: number;
  totalUsdtDebit: number;
  directMemberCount: number;
  indirectMemberCount: number;
  isKycVerified: boolean;
  kycVerifiedAt?: TString | null;
  activationDate?: string | null;
  lastLoginAt?: string | null;
  lastLoginIp?: string | null;
  loginCount: number;
  twoFactorEnabled: boolean;
  userProfile: TUserSignUpData;
  userWallet: TUserWallet;
  totalPlatformFeeUsdt: number;
};

/**
 * Create / Update Member
 */
export type TCreateMember = {
  username: TString;
  email: TString;
  phoneNumber: TString;
  sponsorName?: TString | null;
  userRole: TString;
  status?: string;
  activationDate?: string | null;
};

export type TCreateMemberArgs = TCreateMember;
export type TCreateMemberRes = TApiResponse<TMember>;

export type TUpdateMemberBody = {
  userName: TString;
  email: TString;
  phoneNumber: TString;
  password?: TString;
  firstName: TString;
  lastName: TString;
  addressLine1?: TString;
  city?: TString;
  stateId?: TString;
  countryId?: TString;
  zipCode?: TString;
};

export type TUpdateMemberArgs = {
  id: TString;
  body: Partial<TUpdateMemberBody> | FormData;
};
export type TUpdateMemberRes = TApiResponse<TMember>;

export type TUpdateMemberStatusArgs = {
  id: TString;
  body: { status: string };
};
export type TUpdateMemberStatusRes = TApiResponse<TMember>;

/**
 * Get Members
 */
export type TGetMembersData = {
  items: TMember[];
  meta: TPaginationMeta;
};

export type TGetMembersRes = TApiResponse<TGetMembersData>;
export type TGetMembersArgs = TPaginationArgs;

/**
 * Get Single Member
 */
export type TGetAMemberRes = TApiResponse<TMember>;
export type TGetAMemberArgs = TIdOrSlugOrIdentifier<"id">;

/**
 * Delete Member
 */
export type TDeleteAMemberArgs = TIdOrSlugOrIdentifier<"id">;
export type TDeleteAMemberRes = TApiResponse<null>;
