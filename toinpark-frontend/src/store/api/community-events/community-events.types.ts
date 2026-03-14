import {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TMedia,
  TPaginationArgs,
  TPaginationMeta,
  TString,
} from "../common-api-types";


export enum EEventType {
  CONFERENCE = "CONFERENCE",
  MEETUP = "MEETUP",
  WORKSHOP = "WORKSHOP",
  WEBINAR = "WEBINAR",
  NETWORKING = "NETWORKING",
  OTHER = "OTHER",
}
export type TEventType = `${EEventType}`;

export type TTimeStamp = {
  createdAt: TString;
  updatedAt: TString;
  deletedAt: TString;
};

/**
 * Single Community Event
 */
export type TCreateCommunityEvent = {
  title: TString;
  eventDate?: TString;
  eventLocation?: TString;
  eventType: TEventType;
  mapLink?: TString;
  eventLink?: TString;
  bannerImage?: TString;
  description?: TString;
  isActive?: boolean;
  isFeatured?: boolean;
  media?: TMedia;
};

export type TCommunityEvent = TTimeStamp &
  TCreateCommunityEvent & {
    id: TString;
  };

/**
|--------------------------------------------------
| Create A Community Event Start
|--------------------------------------------------
*/

export type TCreateCommunityEventArgs = TCreateCommunityEvent;

export type TCreateCommunityEventRes = TApiResponse<TCreateCommunityEvent>;

/**
|--------------------------------------------------
| Create A Community Event End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Community Event Start
|--------------------------------------------------
*/

export type TUpdateCommunityEventArgs = {
  id: TString;
  body: Partial<TCreateCommunityEvent> | FormData;
};
export type TUpdateCommunityEventRes = TApiResponse<TCreateCommunityEvent>;

/**
|--------------------------------------------------
| Update A Community Event End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
|  Get Community Events Start
|--------------------------------------------------
*/

export type TGetCommunityEventsData = {
  items: TCommunityEvent[];
  meta: TPaginationMeta;
};

export type TGetCommunityEventsRes =
  TApiResponse<TGetCommunityEventsData>;

export type TGetCommunityEventsArgs = TPaginationArgs;

/**
|--------------------------------------------------
| Get Community Events End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get A Community Event Start
|--------------------------------------------------
*/
export type TGetACommunityEventRes = TApiResponse<TCommunityEvent>;

export type TGetACommunityEventArgs = TIdOrSlugOrIdentifier<"id">;

/**
|--------------------------------------------------
| Get A Community Event End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete A Community Event Start
|--------------------------------------------------
*/

export type TDeleteACommunityEventArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteACommunityEventRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete A Community Event End
|--------------------------------------------------
*/
