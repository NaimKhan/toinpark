import { TApiResponse } from "../common-api-types";

export type TAdminDashboardStats = {
  totalRegisteredUsers: number;
  totalInvestmentAmount: {
    toinAmount: number;
    usdtAmount: number;
  };
  levelIncome: {
    toinAmount: number;
    usdtAmount: number;
  };
  roiLevelIncome: {
    toinAmount: number;
    usdtAmount: number;
  };
  totalWithdrawalAmount: {
    pending: number;
    approved: number;
    total: number;
  };
};

export type TUserRegistrationData = {
  year: number;
  month: number;
  monthName: string;
  count: number;
};

export type TUserRegistrationStats = {
  data: TUserRegistrationData[];
  totalUsers: number;
};

export type TGetUserRegistrationGraphArgs = {
  startDate?: string;
  endDate?: string;
};

export type TGetAdminDashboardStatsRes = TApiResponse<TAdminDashboardStats>;
export type TGetUserRegistrationGraphRes = TApiResponse<TUserRegistrationStats>;
