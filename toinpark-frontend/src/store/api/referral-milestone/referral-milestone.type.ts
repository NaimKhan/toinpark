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
 * Single Referral Milestone Item
 */
export type TCreateReferralMilestone = {
  referralName?: TString;
  toinAmount?: TNumber;
  targetPerson?: TNumber;
  isActive?: boolean;
  perUserMilestone?: TNumber;
};

export type TReferralMilestone = TTimeStamp &
  TCreateReferralMilestone & {
    id: TString;
    isActive: boolean;
  };

/**
|--------------------------------------------------
| Create A Referral Milestone Start
|--------------------------------------------------
*/

export type TCreateReferralMilestoneArgs = TCreateReferralMilestone;

export type TCreateReferralMilestoneRes = TApiResponse<TCreateReferralMilestone>;

/**
|--------------------------------------------------
| Create A Referral Milestone End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Referral Milestone Start
|--------------------------------------------------
*/

export type TUpdateReferralMilestoneArgs = TUpdateOptionalArgs<
  TCreateReferralMilestone,
  "id"
>;

export type TUpdateReferralMilestoneRes = TApiResponse<TCreateReferralMilestone>;
/**
|--------------------------------------------------
| Update A Referral Milestone End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
|  Get Referral Milestones Start
|--------------------------------------------------
*/

export type TGetReferralMilestonesData = {
  items: TReferralMilestone[];
  meta: TPaginationMeta;
};

export type TGetReferralMilestonesRes = TApiResponse<TGetReferralMilestonesData>;

export type TGetReferralMilestonesArgs = TPaginationArgs;

/**
|--------------------------------------------------
| Get Referral Milestones End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get A Referral Milestone Start
|--------------------------------------------------
*/
export type TGetAReferralMilestoneRes = TApiResponse<TReferralMilestone>;

export type TGetAReferralMilestoneArgs = TIdOrSlugOrIdentifier<"id">;

/**
|--------------------------------------------------
| Get A Referral Milestone End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Referral Milestone Status Start
|--------------------------------------------------
*/

export type TUpdateAReferralMilestoneArgs = TIdOrSlugOrIdentifier<"id">;

export type TUpdateAReferralMilestoneRes = TApiResponse;

/**
|--------------------------------------------------
| Update A Referral Milestone Status End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete A Referral Milestone Start
|--------------------------------------------------
*/

export type TDeleteAReferralMilestoneArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteAReferralMilestoneRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete A Referral Milestone End
|--------------------------------------------------
*/
