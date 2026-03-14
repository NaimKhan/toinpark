import { apiSlice } from "..";
import {
  TGetAdminDashboardStatsRes,
  TGetUserRegistrationGraphArgs,
  TGetUserRegistrationGraphRes,
} from "./admin-dashboard.type";

export const adminDashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardStats: builder.query<TGetAdminDashboardStatsRes, void>({
      query: () => ({
        url: "/v1/dashboard/get-admin-dashboard-toins-summary",
        method: "GET",
      }),
      providesTags: ["getAdminStats"],
    }),
    getUserRegistrationGraph: builder.query<
      TGetUserRegistrationGraphRes,
      TGetUserRegistrationGraphArgs | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.startDate) params.append("startDate", args.startDate);
        if (args?.endDate) params.append("endDate", args.endDate);

        const queryString = params.toString() ? `?${params.toString()}` : "";

        return {
          url: `/v1/dashboard/get-user-registration-graph${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAdminStats"],
    }),
  }),
});

export const {
  useGetAdminDashboardStatsQuery,
  useGetUserRegistrationGraphQuery,
} = adminDashboardApi;
