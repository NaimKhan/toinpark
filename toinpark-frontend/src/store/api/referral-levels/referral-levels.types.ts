import {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNumber,
  TPaginationArgs,
  TPaginationMeta,
  TString,
  TUpdateOptionalArgs,
} from "../common-api-types";

export type TReferralLevel = {
  id: string;
  levelName: string;
  totalData: string;
  referralBonusPercentage: TNumber;
  levelNumber: TNumber;
  isActive: boolean;
  createdAt: TString;
  createdBy: TString;
  updatedAt: TString;
  deletedAt: TString;
};

/**
|--------------------------------------------------
| Get All Referral Levels Start
|--------------------------------------------------
*/
export type TGetAllReferralLevels = {
  items: TReferralLevel[];
  meta: TPaginationMeta;
};
export type TGetReferralLevelsArgs = TPaginationArgs;

export type TGetReferralLevelsRes = TApiResponse<TGetAllReferralLevels>;

/**
|--------------------------------------------------
| Get All Referral Levels End
|--------------------------------------------------
*/
/**
|--------------------------------------------------
| Get All Referral Levels Member Start
|--------------------------------------------------
*/
export type TGetAllReferralLevelsMember = {
  items: TReferralLevel[];
  meta: TPaginationMeta;
  totalReferralMembers: number;
};
export type TGetReferralLevelsMemberArgs = TPaginationArgs;

export type TGetReferralLevelsMemberRes =
  TApiResponse<TGetAllReferralLevelsMember>;

/**
|--------------------------------------------------
| Get All Referral Levels Member End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Create Referral Levels Start
|--------------------------------------------------
*/
export type TLevels = {
  id?: string;
  levelName?: string;
  levelNumber: TNumber;
  referralBonusPercentage: TNumber;
};

export type TCreateReferralLevelsArgs = TLevels;

export type TCreateReferralLevelsRes = TApiResponse<TLevels[]>;

/**
|--------------------------------------------------
| Create Referral Levels End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Referral Levels Start
|--------------------------------------------------
*/

export type TUpdateReferralLevel = TLevels & {
  id: string;
};

export type TUpdateReferralLevelsArgs = TUpdateOptionalArgs<
  TUpdateReferralLevel,
  "id"
>;

export type TUpdateReferralLevelsRes = TApiResponse<TUpdateReferralLevel>;
/**
|--------------------------------------------------
| Update A Referral Levels End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete A Official Announcement Start
|--------------------------------------------------
*/

export type TDeleteReferralLevelsArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteReferralLevelsRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete A Official Announcement End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get Referral Level Members Start
|--------------------------------------------------
*/

export type TReferralMemberItem = {
  id: string;
  userId: string;
  toinAccountNumber: string;
  status: string;
  createdAt: string;
  userProfile: {
    firstName: string;
    lastName: string;
    country: {
      name: string;
    };
  };
};

export type TGetReferralLevelMembersRes = TApiResponse<{
  items: TReferralMemberItem[];
  meta: TPaginationMeta;
}>;

export type TGetReferralLevelMembersArgs = TPaginationArgs & {
  levelId: string;
  userId: string;
};

/**
|--------------------------------------------------
| Get Referral Level Members End
|--------------------------------------------------
*/
