import {
  TApiResponse,
  TNullish,
  TNumber,
  TPaginationArgs,
  TPaginationMeta,
  TString,
} from "../common-api-types";

/* ---------------------------------------------
 * Shared Base Types
------------------------------------------- 
*/

// Common fields for all location entities
export type TBaseLocation = {
  id: TString;
  name: TString;
  code: TString;
  isActive: boolean | TNullish;
  createdAt?: TString;
  updatedAt?: TString;
};

// Reusable pagination response
export type TPaginationResponse<T> = {
  items: T[];
  meta: TPaginationMeta;
};

/**
|--------------------------------------------------
| Get Countries Start
|--------------------------------------------------
*/

export type TCountryCount = {
  states: TNumber;
};

export type TCountry = TBaseLocation & {
  phoneCode: TString;
  currencyCode: TString;
  count: TCountryCount;
};

export type TGetCountriesArgs = TPaginationArgs;
export type TGetCountriesRes = TApiResponse<TPaginationResponse<TCountry>>;

/**
|--------------------------------------------------
| Get Countries End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get States Start
|--------------------------------------------------
*/

export type TCountryMini = Pick<TBaseLocation, "id" | "name" | "code">;

export type TState = TBaseLocation & {
  countryId: TString;
  country: TCountryMini;
};

export type TStateQuery = TPaginationArgs & {
  countryId: TString;
};

export type TGetStatesArgs = TStateQuery;
export type TGetStatesRes = TApiResponse<TPaginationResponse<TState>>;

/**
|--------------------------------------------------
| Get States End
|--------------------------------------------------
*/
