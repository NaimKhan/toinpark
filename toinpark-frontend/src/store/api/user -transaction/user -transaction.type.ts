import {
  TApiResponse,
  TPaginationArgs,
  TPaginationMeta,
} from "../common-api-types";
import { TReferralLevel } from "../referral-levels/referral-levels.types";
import { TGetAStakingPackage } from "../staking-package/staking-package.type";
import { TCountry } from "../user-profile/user-profile.types";

type TUserProfile = {
  id?: string;
  firstName?: string;
  lastName?: string;
  addressLine1?: string;
  city?: string;
  zipCode?: string;
  profileImageUrl?: string;
  userId?: string;
  country: Pick<TCountry, "id" | "name" | "code">;
};

type TUserInfo = {
  id: string;
  phoneNumber: string;
  email: string;
  emailVerified: boolean;
  emailVerifiedAt: string;
  phoneVerified: boolean;
  phoneVerifiedAt: string;
  username: string;
  status: string;
  referralCode: string;
  toinAccountNumber: string;
  totalReferred: string;
  userProfile: TUserProfile;
};

export type TBaseTransaction = {
  id: string;
  transactionAutoId: string;
  trxType: string;
  toinAmount: number;
  usdtAmount: number;
  usdtConversionRate: number;
  trxSuccessDatetime: string | null;
  trxPaymentGateway: string | null;
  trxPaymentGatewayReferenceId: string | null;
  trxPaymentGatewayResponse: string | null;
  trxStatus: string;
  trxNote: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  amountType: "Credit" | "Debit";
  toinBalanceAmount: number;
  usdtBalanceAmount: number;
  userId: string;
  levelId: string | null;
  userStakingPackageId: string | null;
  stakingAdjustmentId: string | null;
  user: TUserInfo;
};

export type TTransactionSearch = TBaseTransaction & {
  referralLevel: TReferralLevel | null;
  userStakingPackage: {
    toinAmount: number;
    user: {
      username: string;
      userProfile: {
        firstName: string;
        lastName: string;
      };
    };
  } & TGetAStakingPackage | null;
  remark?: string;
};

/**
|--------------------------------------------------
| Get Stacking Transaction Start
|--------------------------------------------------
*/
export type TGetAllStackingTransactionSearch = {
  items: TTransactionSearch[];
  meta: TPaginationMeta;
};

export type TGetStakingTransactionArgs = TPaginationArgs;
export type TGetStakingTransactionRes =
  TApiResponse<TGetAllStackingTransactionSearch>;

/**
|--------------------------------------------------
| Get Stacking Transaction End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get User Wise All Transaction Start
|--------------------------------------------------
*/

export type TGetUserTransactionSearch = {
  items: TTransactionSearch[];
  meta: TPaginationMeta;
};

export type TGetUserTransactionArgs = TPaginationArgs;
export type TGetUserTransactionRes = TApiResponse<TGetUserTransactionSearch>;

export type TGetMemberTransactionHistoryArgs = TPaginationArgs<
  TTransactionSearch,
  { userId: string }
>;
export type TGetMemberTransactionHistoryRes =
  TApiResponse<TGetUserTransactionSearch>;

/**
|--------------------------------------------------
| Get  User Wise All Transaction End
|--------------------------------------------------
*/
