import {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TPaginationArgs,
  TPaginationMeta,
  TString,
  TUpdateOptionalArgs,
} from "../common-api-types";

export type TCreateWalletAddress = {
  walletAccountId: TString;
  name: TString;
};

export type TWalletAddress = TCreateWalletAddress & {
  id: TString;
  label?: TString;
  address?: TString;
  isDefault?: boolean;
};

export type TCreateWalletAddressArgs = TCreateWalletAddress;

export type TCreateWalletAddressRes = TApiResponse<TWalletAddress>;

export type TUpdateWalletAddressArgs = TUpdateOptionalArgs<
  TCreateWalletAddress,
  "id"
>;
export type TUpdateWalletAddressRes = TApiResponse<TWalletAddress>;

export type TGetAllWalletAddressesArgs = TPaginationArgs;

export type TGetAllWalletAddressesData = {
  items: TWalletAddress[];
  meta: TPaginationMeta;
};

export type TGetAllWalletAddressesRes =
  TApiResponse<TGetAllWalletAddressesData>;

export type TGetAWalletAddressArgs = TIdOrSlugOrIdentifier<"id">;
export type TGetAWalletAddressRes = TApiResponse<TWalletAddress>;
