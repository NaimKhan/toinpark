import {
  TApiResponse,
  TPaginationArgs,
  TPaginationMeta,
} from "../common-api-types";
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

export type TRecentTransaction = {
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
  referralLevel: any | null;
  userStakingPackage: any | null;
};

export type TGetRecentTransactionsData = {
  items: TRecentTransaction[];
  meta: TPaginationMeta;
};

export type TGetRecentTransactionsRes =
  TApiResponse<TGetRecentTransactionsData>;
export type TGetRecentTransactionsArgs = TPaginationArgs;
