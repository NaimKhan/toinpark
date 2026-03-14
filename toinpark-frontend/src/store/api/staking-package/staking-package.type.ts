import {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNumber,
  TPaginationArgs,
  TPaginationMeta,
  TString,
  TUpdateOptionalArgs,
} from "../common-api-types";

/**
|--------------------------------------------------
| Reuseable Types start
|--------------------------------------------------
*/
export type TTimeStamp = {
  createdAt: TString;
  updatedAt: TString;
  deletedAt: TString;
};

export type TCreateStakingPackage = {
  name: TString;
  description: TString;
  dailyProfitPercent: TNumber;
  bonusAmount: TNumber;
  maxToinAmount: TNumber;
  minToinAmount: TNumber;
  minimumDurationInDays: TNumber;
  recurringProfitDays: TNumber;
  totalToinPurchasedWithUSD: TNumber;
};

export type TGetAStakingPackage = TCreateStakingPackage &
  TTimeStamp & {
    id: TString;
    isActive: boolean;
  };

export type TCreateAStakingPackageArgs = TCreateStakingPackage;

export type TCreateAStakingPackageRes = TApiResponse;

export type TBuyAStakingPackage = {
  stakingPackageId: TString;
  paymentMethod: TString;
  toinAmount: TNumber;
  USDAmount: TNumber;
};

export type TBuyAStakingPackageArgs = TBuyAStakingPackage;

export type TBuyAStakingPackageResponseData = {
  id: string;
  ipn_callback_url: string;
  invoice_url: string;
  success_url: string;
  cancel_url: string;
};

export type TBuyAStakingPackageRes =
  TApiResponse<TBuyAStakingPackageResponseData>;

export type TGetStakingPackagesArgs = TPaginationArgs;

export type TGetStakingPackages = {
  items: TGetAStakingPackage[];
  meta: TPaginationMeta;
};

export type TGetStakingPackagesRes = TApiResponse<TGetStakingPackages>;

export type TGetActiveStakingPackagesArgs = TPaginationArgs;

export type TGetActiveStakingPackagesRes = TApiResponse<TGetStakingPackages>;

export type TGetAllUserStakingPackagesArgs = TPaginationArgs;

export type TGetAllUserStakingPackagesRes = TApiResponse<TGetAStakingPackage[]>;

export type TGetAStakingPackageArgs = TIdOrSlugOrIdentifier<"id">;

export type TGetAStakingPackageRes = TApiResponse<TGetAStakingPackage>;

export type TUpdateAStakingPackageArgs = TUpdateOptionalArgs<
  TGetAStakingPackage,
  "id"
>;

export type TUpdateAStakingPackageRes = TApiResponse<TGetAStakingPackage>;

export type TUpdateAStakingPackageStatusArgs = TIdOrSlugOrIdentifier<"id">;

export type TUpdateAStakingPackageStatusRes = TApiResponse<TGetAStakingPackage>;

export type TDeleteAStakingPackageArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteAStakingPackageRes = TApiResponse<TGetAStakingPackage>;
