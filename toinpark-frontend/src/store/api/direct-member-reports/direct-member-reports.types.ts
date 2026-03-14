import {
  TApiResponse,
  TPaginationArgs,
  TPaginationMeta,
  TString,
} from "../common-api-types";
import { TUserSignUpData } from "../auth/auth.types";

export type TDirectMember = {
  toinAccountNumber: TString;
  userProfile: TUserSignUpData;
  email: TString;
  phone: TString;
  registrationDate: TString;
  createdAt: TString;
};

export type TGetDirectMembersData = {
  items: TDirectMember[];
  meta: TPaginationMeta;
};

export type TGetDirectMembersRes = TApiResponse<TGetDirectMembersData>;
export type TGetDirectMembersArgs = TPaginationArgs ;
