import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TAdminStakeArgs,
  TAdminStakeRes,
  TDeductFundArgs,
  TDeductFundRes,
  TGetAdminStakesArgs,
  TGetAdminStakesRes,
  TGetDeductFundHistoryRes,
} from "./admin-staking.types";

export const adminStakingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminStake: builder.mutation<TAdminStakeRes, TAdminStakeArgs>({
      query: (data) => ({
        url: "/v1/admin/staking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [
            "getStakingPackages",
            "getAllUserStakingPackages",
            "getStakingTransaction",
          ];
        }
        return [];
      },
    }),
    deductFund: builder.mutation<TDeductFundRes, TDeductFundArgs>({
      query: (data) => ({
        url: "/v1/admin/staking-adjustment/deduct",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [
            "getStakingPackages",
            "getAllUserStakingPackages",
            "getStakingTransaction",
          ];
        }
        return [];
      },
    }),
    getAdminStakes: builder.query<TGetAdminStakesRes, TGetAdminStakesArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/admin/staking${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getStakingTransaction"],
    }),
    getUserStakingPackages: builder.query({
      query: (userId) => ({
        url: `/v1/admin/staking-adjustment/user-staking-packages/${userId}`,
        method: "GET",
      }),
      providesTags: ["getAllUserStakingPackages"],
    }),
    getStakingAdjustments: builder.query<
      TGetDeductFundHistoryRes,
      TGetAdminStakesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/admin/staking-adjustment${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getStakingTransaction"],
    }),
  }),
});

export const {
  useAdminStakeMutation,
  useDeductFundMutation,
  useGetAdminStakesQuery,
  useGetUserStakingPackagesQuery,
  useGetStakingAdjustmentsQuery,
} = adminStakingApi;
