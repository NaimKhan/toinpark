import {
  TApiResponse,
  TNumber,
  TPaginationArgs,
  TPaginationMeta,
  TString,
} from "../common-api-types";

export type TGetAdminStakesArgs = TPaginationArgs;

export type TAdminStakeItem = {
  id: TString;
  stakeCreatedBy: TString;
  createdAt: TString;
  remarks: TString;
  user: {
    id: TString;
    username: TString;
    userProfile: {
      firstName: TString;
      lastName: TString;
    };
  };
  stakedBy: {
    id: TString;
    username: TString;
    toinAccountNumber: TString;
    userProfile: {
      firstName: TString;
      lastName: TString;
    };
  };
  package: {
    id: TString;
    name: TString;
  };
  transactions: {
    id: TString;
    toinAmount: TNumber;
    usdtAmount: TNumber;
    trxStatus: TString;
    trxNote: TString;
  }[];
};

export type TGetAdminStakesRes = TApiResponse<{
  items: TAdminStakeItem[];
  meta: TPaginationMeta;
}>;

export type TDeductFundHistoryItem = {
  id: TString;
  userId: TString;
  userStakingPackageId: TString;
  toinAmount: TString;
  usdtAmount: TString;
  usdtConversionRate: TString;
  remark: TString;
  createdAt: TString;
  user: {
    id: TString;
    toinAccountNumber: TString;
    firstName: TString;
    lastName: TString;
  };
  adjustedBy: {
    id: TString;
    username: TString;
    toinAccountNumber: TString;
    userProfile: {
      firstName: TString;
      lastName: TString;
    };
  };
  transaction: {
    id: TString;
    transactionAutoId: TNumber;
    trxType: TString;
    trxStatus: TString;
    remark: TString;
  };
};

export type TGetDeductFundHistoryRes = TApiResponse<{
  items: TDeductFundHistoryItem[];
  meta: TPaginationMeta;
}>;

export type TAdminStake = {
  userId: TString;
  toinAmount: TNumber;
  usdtAmount: TNumber;
  remark?: TString;
};

export type TAdminStakeArgs = TAdminStake;

export type TAdminStakeRes = TApiResponse;

export type TDeductFundArgs = {
  userId: TString;
  userStakingPackageId: TString;
  toinAmount: TNumber;
  remark: TString;
};

export type TDeductFundRes = TApiResponse;
