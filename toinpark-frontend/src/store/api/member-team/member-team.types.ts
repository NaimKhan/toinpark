import {
  TApiResponse,
  TPaginationArgs,
  TPaginationMeta,
} from "../common-api-types";

export type TTeamMember = {
  id: string;
  toinAccountNumber: string;
  username: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: string;
  userProfile?: {
    firstName?: string;
    lastName?: string;
  };
};

export type TMemberTeamData = {
  id: string;
  username: string;
  sponsorName?: string;
  sponsorToinAccountNumber?: string;
  items: TTeamMember[];
  meta: TPaginationMeta;
  memberInfo: {
    id: string;
    fullName: string;
    toinAccountNumber: string;
  };
};

export type TGetMemberTeamRes = TApiResponse<TMemberTeamData>;
export type TGetMemberTeamArgs = TPaginationArgs & {
  id: string;
  startDate?: string;
  endDate?: string;
};
