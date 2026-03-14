import {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TPaginationArgs,
  TPaginationMeta,
  TString,
  TUpdateOptionalArgs,
} from "../common-api-types";

/**
|--------------------------------------------------
| Create A Ticket Category Start
|--------------------------------------------------
*/
export type TCreateTicketCategories = {
  name: TString;
  isActive?: boolean;
};

export type TCreateATicketsCategoriesRes =
  TApiResponse<TGetTicketsCategoriesData>;

export type TCreateATicketsCategoriesArgs = TCreateTicketCategories;

/**
|--------------------------------------------------
| Create A Ticket Category End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get All Ticket Category Start
|--------------------------------------------------
*/

export type TGetTicketsCategoriesData = TCreateTicketCategories & {
  id: TString;
  createdAt?: TString;
  createdBy?: TString;
  updatedAt?: TString;
  updatedBy?: TString;
};

export type TGetTicketsCategories = {
  items: TGetTicketsCategoriesData[];
  meta: TPaginationMeta;
};

export type TGetTicketsCategoriesRes = TApiResponse<TGetTicketsCategories>;

export type TGetTicketsCategoriesArgs = TPaginationArgs;

/**
|--------------------------------------------------
| Get All Ticket Category End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get All Active Ticket Category Start
|--------------------------------------------------
*/

export type TGetActiveTicketsCategoriesRes = TApiResponse<
  TGetTicketsCategoriesData[]
>;

export type TGetActiveTicketsCategoriesArgs = TPaginationArgs;

/**
|--------------------------------------------------
| Get All Active Ticket Category End
|--------------------------------------------------
*/
/**
|--------------------------------------------------
| Get A Ticket Category Start
|--------------------------------------------------
*/

export type TGetATicketsCategoryRes = TApiResponse<TGetTicketsCategoriesData>;

export type TGetATicketsCategoriesArgs = TIdOrSlugOrIdentifier<"id">;

/**
|--------------------------------------------------
| Get A Ticket Category End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Ticket Start
|--------------------------------------------------
*/

export type TUpdateATicketCategoryArgs = TUpdateOptionalArgs<
  TCreateTicketCategories,
  "id"
>;

export type TUpdateATicketCategoryRes = TApiResponse<TGetTicketsCategoriesData>;

/**
|--------------------------------------------------
| Update A Ticket End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete A Ticket Category Start
|--------------------------------------------------
*/

export type TDeleteATicketArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteATicketRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete A Ticket Category End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Ticket Category status Start
|--------------------------------------------------
*/

export type TUpdateTicketCategoryStatusArgs = TIdOrSlugOrIdentifier<"id">;

export type TUpdateTicketCategoryStatusRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Update A Ticket Category status End
|--------------------------------------------------
*/
