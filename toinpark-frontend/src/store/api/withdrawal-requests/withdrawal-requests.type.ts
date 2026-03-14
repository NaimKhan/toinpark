import {
  TApiResponse,
  TPaginationArgs,
  TPaginationMeta,
} from "../common-api-types";

export type TCreateWithdrawalRequestArgs = {
  userStakingPackageId: string;
  address: string;
  amount: number;
  currency: string;
};

export type TCreateWithdrawalRequestRes = TApiResponse<any>;

export type TWithdrawalRequestItem = {
  id: string;
  userStakingPackageId: string;
  address: string;
  amount: number;
  platformFee: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  remark?: string;
  userStakingPackage: {
    toinAmount: number;
    usdtAmount: number;
    package: {
      name: string;
    };
  };
  creator: {
    username: string;
    toinAccountNumber: string;
    userProfile: {
      firstName: string;
      lastName: string;
    };
  };
};

export type TGetMemberWithdrawalRequestsArgs = TPaginationArgs<
  TWithdrawalRequestItem,
  { status?: string; currency?: string }
>;

export type TGetWithdrawalRequestsArgs = TPaginationArgs<
  TWithdrawalRequestItem,
  { status?: string; currency?: string }
>;
export type TGetWithdrawalRequestsRes = TApiResponse<{
  items: TWithdrawalRequestItem[];
  meta: TPaginationMeta;
}>;
