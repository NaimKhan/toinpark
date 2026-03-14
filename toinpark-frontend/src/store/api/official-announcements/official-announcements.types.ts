import {
  TApiResponse,
  TAudienceType,
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
 * Single Official Announcement
 */
export type TCreateOfficialAnnouncement = {
  title: TString;
  categoryId: TString;
  audienceType: TAudienceType;
  message?: TString;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
};

export type TOfficialAnnouncement = TTimeStamp &
  TCreateOfficialAnnouncement & {
    id: TString;
  };

/**
|--------------------------------------------------
| Create A Official Announcement Start
|--------------------------------------------------
*/

export type TCreateOfficialAnnouncementArgs = TCreateOfficialAnnouncement;

export type TCreateOfficialAnnouncementRes = TApiResponse<TCreateOfficialAnnouncement>;

/**
|--------------------------------------------------
| Create A Official Announcement End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Official Announcement Start
|--------------------------------------------------
*/

export type TUpdateOfficialAnnouncementArgs = TUpdateOptionalArgs<
  TCreateOfficialAnnouncement,
  "id"
>;

export type TUpdateOfficialAnnouncementRes = TApiResponse<TCreateOfficialAnnouncement>;

/**
|--------------------------------------------------
| Update A Official Announcement End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
|  Get Official Announcements Start
|--------------------------------------------------
*/

export type TGetOfficialAnnouncementsData = {
  items: TOfficialAnnouncement[];
  meta: TPaginationMeta;
};


export type TGetOfficialAnnouncementsRes =
  TApiResponse<TGetOfficialAnnouncementsData>;

export type TGetOfficialAnnouncementsArgs = TPaginationArgs ;

/**
|--------------------------------------------------
| Get Official Announcements End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get A Official Announcement Start
|--------------------------------------------------
*/
export type TGetAOfficialAnnouncementRes = TApiResponse<TOfficialAnnouncement>;

export type TGetAOfficialAnnouncementArgs = TIdOrSlugOrIdentifier<"id">;

/**
|--------------------------------------------------
| Get A Official Announcement End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete A Official Announcement Start
|--------------------------------------------------
*/

export type TDeleteAOfficialAnnouncementArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteAOfficialAnnouncementRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete A Official Announcement End
|--------------------------------------------------
*/
