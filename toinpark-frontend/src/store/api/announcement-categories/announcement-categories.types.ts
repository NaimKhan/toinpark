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
  createdBy: TString;
};

/**
 * Single Category Item
 */
export type TCreateAnnouncementCategory = {
  name?: TString;
  description?: TString;
  isActive?: boolean;
};
export type TAnnouncementCategory = TTimeStamp &
  TCreateAnnouncementCategory & {
    id: TString;
  };

/**
|--------------------------------------------------
| Create A Announcement Category Start
|--------------------------------------------------
*/

export type TCreateAnnouncementCategoryArgs = TCreateAnnouncementCategory;

export type TCreateAnnouncementCategoryRes = TApiResponse<TCreateAnnouncementCategory>;

/**
|--------------------------------------------------
| Create A Announcement Category End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A AnnouncementC Category Start
|--------------------------------------------------
*/

export type TUpdateAnnouncementCategoryArgs = TUpdateOptionalArgs<
  TCreateAnnouncementCategory,
  "id"
>;

export type TUpdateAnnouncementCategoryRes = TApiResponse<TCreateAnnouncementCategory>;

/**
|--------------------------------------------------
| Update A Announcement Category End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
|  Get Announcement Categories Start
|--------------------------------------------------
*/

export type TGetAnnouncementCategoriesData = {
  items: TAnnouncementCategory[];
  meta: TPaginationMeta;
};

export type TGetAnnouncementCategoriesRes =
  TApiResponse<TGetAnnouncementCategoriesData>;

export type TGetAnnouncementCategoriesArgs = TPaginationArgs;

/**
|--------------------------------------------------
| Get Announcement Categories End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get A Announcement Category Start
|--------------------------------------------------
*/
export type TGetAAnnouncementCategoryRes = TApiResponse<TAnnouncementCategory>;

export type TGetAAnnouncementCategoryArgs = TIdOrSlugOrIdentifier<"id">;

/**
|--------------------------------------------------
| Get A Announcement Category End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete A Announcement Category Start
|--------------------------------------------------
*/

export type TDeleteAAnnouncementCategoryArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteAAnnouncementCategoryRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete A Announcement Category End
|--------------------------------------------------
*/
