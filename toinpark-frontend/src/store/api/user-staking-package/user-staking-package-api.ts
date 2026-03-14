import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TGetMyStakesArgs,
  TGetMyStakesRes,
  TGetUserStakingPackagesArgs,
  TGetUserStakingPackagesRes,
} from "./user-staking-package.type";

export const userStakingPackageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserStakingPackages: builder.query<
      TGetUserStakingPackagesRes,
      TGetUserStakingPackagesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/user-staking-packages${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAllUserStakingPackages"],
    }),

    getMyStakes: builder.query<TGetMyStakesRes, TGetMyStakesArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args || {});
        return {
          url: `/v1/user-staking-packages/my-stakes${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAllUserStakingPackages"],
    }),
    getStakingPackageById: builder.query<TGetMyStakesRes, string>({
      query: (id) => ({
        url: `/v1/user-staking-packages/my-stakes/${id}`,
        method: "GET",
      }),
      providesTags: ["getStakingPackageById"],
    }),
  }),
});

export const {
  useGetUserStakingPackagesQuery,
  useGetMyStakesQuery,
  useGetStakingPackageByIdQuery,
} = userStakingPackageApi;
