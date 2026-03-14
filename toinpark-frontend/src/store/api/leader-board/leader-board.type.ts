import {
  TApiResponse,
  TMedia,
  TPaginationMeta,
  TString,
} from "../common-api-types";

/**
|--------------------------------------------------
| Get Toin Leaderboard Start
|--------------------------------------------------
*/

export type TLeaderboardItem = {
  userId: TString;
  firstName: TString;
  lastName: TString;
  profileImageUrl: TString | null;
  totalToin: TString;
  media: TMedia | null;
};

export type TGetToinLeaderBoardArgs = {
  page?: number;
  limit?: number;
  search?: string;
};

export type TGetToinLeaderBoardRes = TApiResponse<{
  items: TLeaderboardItem[];
  meta: TPaginationMeta;
}>;

/**
|--------------------------------------------------
| Get Toin Leaderboard End
|--------------------------------------------------
*/
