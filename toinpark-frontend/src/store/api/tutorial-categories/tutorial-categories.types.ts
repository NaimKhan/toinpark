import {
  TApiResponse,
  TIdOrSlugOrIdentifier,
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
 * Single Category Item
 */
export type TCreateCategory = {
  name?: TString;
  description?: TString;
  isActive?: boolean;
};

export type TCategory = TTimeStamp &
  TCreateCategory & {
    id: TString;
  };

/**
|--------------------------------------------------
| Create A Tutorial Category Start
|--------------------------------------------------
*/

export type TCreateTutorialCategoryArgs = TCreateCategory;

export type TCreateTutorialCategoryRes = TApiResponse<TCreateCategory>;

/**
|--------------------------------------------------
| Create A Tutorial Category End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Tutorial Category Start
|--------------------------------------------------
*/

export type TUpdateTutorialCategoryArgs = TUpdateOptionalArgs<
  TCreateCategory,
  "id"
>;

export type TUpdateTutorialCategoryRes = TApiResponse<TCreateCategory>;

/**
|--------------------------------------------------
| Update A Tutorial Category End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
|  Get Tutorial Categories Start
|--------------------------------------------------
*/

export type TGetTutorialCategoriesData = {
  items: TCategory[];
  meta: TPaginationMeta;
};

export type TGetTutorialCategoriesRes =
  TApiResponse<TGetTutorialCategoriesData>;

export type TGetTutorialCategoriesArgs = TPaginationArgs;

/**
|--------------------------------------------------
| Get Tutorial Categories End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get A Tutorial Category Start
|--------------------------------------------------
*/
export type TGetATutorialCategoryRes = TApiResponse<TCategory>;

export type TGetATutorialCategoryArgs = TIdOrSlugOrIdentifier<"id">;

/**
|--------------------------------------------------
| Get A Tutorial Category End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete A Tutorial Category Start
|--------------------------------------------------
*/

export type TDeleteATutorialCategoryArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteATutorialCategoryRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete A Tutorial Category End
|--------------------------------------------------
*/
