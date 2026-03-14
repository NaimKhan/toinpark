import { TApiResponse, TString } from "../common-api-types";

export type TTimeStamp = {
  createdAt: TString;
  updatedAt: TString;
  deletedAt: TString;
};

/**
 * User Tokens Summary (GET Response Item)
 */
export type TGetUserToinsSummery = {
  walletBalance?: number;
  totalEarnings?: number;
  totalBonus?: number;
  totalReferral?: number;
  totalReferralByLeveling?: number;
  totalReward?: number;
  totalStaking?: number;
  totalWithdrawals?: number;
  totalLevelingBonus?: number;
};

export type TUserToinsSummery = TTimeStamp &
  TGetUserToinsSummery & {
    id: TString;
    walletBalance: number;
    totalEarnings: number;
    totalBonus: number;
    totalReferral: number;
    totalReferralByLeveling: number;
    totalReward: number;
    totalStaking: number;
    totalWithdrawals: number;
    totalLevelingBonus: number;
  };

/**
 * Args + Response for GET User Tokens Summary
 */
export type TGetUserToinsSummeryArgs = void;

export type TGetUserToinsSummeryRes = TApiResponse<TGetUserToinsSummery>;

/**
|--------------------------------------------------
| Get Invitation Claimed Start
|--------------------------------------------------
*/
export type TGetInvitationClaimed = {
  milestone: TString;
  totalRefer: number;
  progress: number;
  targetPerson: number;
  display: TString;
};

export type TGetInvitationClaimedArgs = void;

export type TGetInvitationClaimedRes = TApiResponse<TGetInvitationClaimed>;

/**
|--------------------------------------------------
| Get Invitation Claimed End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get Referral Milestone Start
|--------------------------------------------------
*/
export type TGetReferralMilestone = {
  referralName: TString;
  toinAmount?: number;
  targetPerson?: number;
  perUserMilestone: number;
  description?: TString;
};

export type TReferralMilestone = TTimeStamp &
  TGetReferralMilestone & {
    id: TString;
  };

export type TGetReferralMilestoneArgs = void;

export type TGetReferralMilestoneRes = TApiResponse<TReferralMilestone[]>;

/**
|--------------------------------------------------
| Get Referral Milestone End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get Referral Link Start
|--------------------------------------------------
*/

export type TGetReferralLinkArgs = void;

export type TGetReferralLinkRes = TApiResponse;

/**
|--------------------------------------------------
| Get Referral Link End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get Email Invitation  Start
|--------------------------------------------------
*/

export type TGetEmailInvitationArgs = {
  emailId: TString;
};

export type TGetEmailInvitationRes = TApiResponse;

/**
|--------------------------------------------------
| Get Email Invitation  End
|--------------------------------------------------
*/

/* ================================================== */

/**
|--------------------------------------------------
| Get Air Drop Active Event Start
|--------------------------------------------------
*/

export type TGetAirDropActiveEventArgs = void;

export type TGetAirDropActiveEventRes = TApiResponse<{
  demo: TString;
  totalToinAmount: number;
  usesToinAmount: number;
  usesToinPercent: number;
}>;

/**
|--------------------------------------------------
| Get Air Drop Active Event End
|--------------------------------------------------
*/
