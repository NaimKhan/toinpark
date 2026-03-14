import {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNumber,
  TPaginationArgs,
  TPaginationMeta,
  TString,
  TUpdateOptionalArgs,
} from "../common-api-types";

export type TTimeStamp = {
  createdAt: TString;
  updatedAt: TString;
  deletedAt: TString;
};

/**
 * Single Airdrop Event Item
 */
export type TCreateAirdropEvent = {
  eventName?: TString;
  totalAmount?: TNumber;
  usdConversionRate?: TNumber;
  eventStartDate?: TString;
  eventEndDate?: TString;
};

export type TAirdropEvent = TTimeStamp &
  TCreateAirdropEvent & {
    id: TString;
    isActive: boolean;
    usedAmount?: TNumber;
  };

/**
|--------------------------------------------------
| Create A Airdrop Event Start
|--------------------------------------------------
*/

export type TCreateAirdropEventArgs = TCreateAirdropEvent;

export type TCreateAirdropEventRes = TApiResponse<TCreateAirdropEvent>;

/**
|--------------------------------------------------
| Create A Airdrop Event End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Airdrop Event Start
|--------------------------------------------------
*/

export type TUpdateAirdropEventArgs = TUpdateOptionalArgs<
  TCreateAirdropEvent,
  "id"
>;

export type TUpdateAirdropEventRes = TApiResponse<TCreateAirdropEvent>;
/**
|--------------------------------------------------
| Update A Airdrop Event End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
|  Get Airdrop Events Start
|--------------------------------------------------
*/

export type TGetAirdropEventsData = {
  items: TAirdropEvent[];
  meta: TPaginationMeta;
};

export type TGetAirdropEventsRes = TApiResponse<TGetAirdropEventsData>;

export type TGetAirdropEventsArgs = TPaginationArgs;

/**
|--------------------------------------------------
| Get Airdrop Events End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get A Airdrop Event Start
|--------------------------------------------------
*/
export type TGetAAirdropEventRes = TApiResponse<TAirdropEvent>;

export type TGetAAirdropEventArgs = TIdOrSlugOrIdentifier<"id">;

/**
|--------------------------------------------------
| Get A Airdrop Event End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Airdrop Event Status Start
|--------------------------------------------------
*/

export type TUpdateAAirdropEventStatusArgs = TUpdateOptionalArgs<{
  id: string;
  eventName: string;
  totalAmount: number;
  usedAmount: number;
  usdConversionRate: number;
  eventStartDate: string;
  eventEndDate: string;
  isActive: boolean;
}>;

export type TUpdateAAirdropEventStatusRes = TApiResponse;

/**
|--------------------------------------------------
| Update A Airdrop Event Status End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete A Airdrop Event Start
|--------------------------------------------------
*/

export type TDeleteAAirdropEventArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteAAirdropEventRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete A Airdrop Event End
|--------------------------------------------------
*/
