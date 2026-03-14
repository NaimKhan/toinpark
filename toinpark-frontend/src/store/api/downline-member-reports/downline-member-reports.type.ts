import {
  TApiResponse,
  TPaginationArgs,
  TPaginationMeta,
  TString,
} from "../common-api-types";
import { TUserSignUpData } from "../auth/auth.types";

export type TDownlineMember = {
  toinAccountNumber: TString;
  userProfile: TUserSignUpData;
  sponsorId: TString;
  sponsorName: TString;
  registrationDate: TString;
  status: string;
};

export type TGetDownlineMembersData = {
  items: TDownlineMember[];
  meta: TPaginationMeta;
};

export type TGetDownlineMembersRes = TApiResponse<TGetDownlineMembersData>;
export type TGetDownlineMembersArgs = TPaginationArgs;
