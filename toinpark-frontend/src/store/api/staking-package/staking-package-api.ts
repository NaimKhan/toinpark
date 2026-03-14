import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TBuyAStakingPackageArgs,
  TBuyAStakingPackageRes,
  TCreateAStakingPackageArgs,
  TCreateAStakingPackageRes,
  TDeleteAStakingPackageArgs,
  TDeleteAStakingPackageRes,
  TGetActiveStakingPackagesArgs,
  TGetActiveStakingPackagesRes,
  TGetAllUserStakingPackagesArgs,
  TGetAllUserStakingPackagesRes,
  TGetAStakingPackageArgs,
  TGetAStakingPackageRes,
  TGetStakingPackagesArgs,
  TGetStakingPackagesRes,
  TUpdateAStakingPackageArgs,
  TUpdateAStakingPackageRes,
  TUpdateAStakingPackageStatusArgs,
  TUpdateAStakingPackageStatusRes,
} from "./staking-package.type";

export const airdropEventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAStakingPackage: builder.mutation<
      TCreateAStakingPackageRes,
      TCreateAStakingPackageArgs
    >({
      query: (data) => ({
        url: "/v1/staking-package-plans",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [
            "getStakingPackages",
            "getAStakingPackage",
            "getActiveStakingPackages",
            "getAllUserStakingPackages",
          ];
        }
        return [];
      },
    }),
    buyAStakingPackage: builder.mutation<
      TBuyAStakingPackageRes,
      TBuyAStakingPackageArgs
    >({
      query: (data) => ({
        url: "/v1/staking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [
            "getStakingPackages",
            "getAStakingPackage",
            "getActiveStakingPackages",
            "getAllUserStakingPackages",
            "getStakingTransaction",
          ];
        }
        return [];
      },
    }),

    getStakingPackages: builder.query<
      TGetStakingPackagesRes,
      TGetStakingPackagesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/staking-package-plans${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getStakingPackages"],
    }),

    getActiveStakingPackages: builder.query<
      TGetActiveStakingPackagesRes,
      TGetActiveStakingPackagesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/staking-package-plans/active${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getStakingPackages"],
    }),

    getAllUserStakingPackages: builder.query<
      TGetAllUserStakingPackagesRes,
      TGetAllUserStakingPackagesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/staking/get-all-staking-package${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllUserStakingPackages"],
    }),

    getAStakingPackage: builder.query<
      TGetAStakingPackageRes,
      TGetAStakingPackageArgs
    >({
      query: ({ id }) => ({
        url: `/v1/staking-package-plans/${id}`,
        method: "GET",
      }),

      providesTags: ["getAStakingPackage"],
    }),

    updateAStakingPackage: builder.mutation<
      TUpdateAStakingPackageRes,
      TUpdateAStakingPackageArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/staking-package-plans/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return [
            "getStakingPackages",
            "getAStakingPackage",
            "getActiveStakingPackages",
            "getAllUserStakingPackages",
          ];
        }
        return [];
      },
    }),

    updateAStakingPackageStatus: builder.mutation<
      TUpdateAStakingPackageStatusRes,
      TUpdateAStakingPackageStatusArgs
    >({
      query: ({ id }) => ({
        url: `/v1/staking-package-plans/${id}/toggle-active`,
        method: "PATCH",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [
            "getStakingPackages",
            "getAStakingPackage",
            "getActiveStakingPackages",
            "getAllUserStakingPackages",
          ];
        }
        return [];
      },
    }),

    deleteAStakingPackage: builder.mutation<
      TDeleteAStakingPackageRes,
      TDeleteAStakingPackageArgs
    >({
      query: ({ id }) => ({
        url: `/v1/staking-package-plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [
            "getStakingPackages",
            "getAStakingPackage",
            "getActiveStakingPackages",
            "getAllUserStakingPackages",
          ];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateAStakingPackageMutation,
  useBuyAStakingPackageMutation,
  useGetStakingPackagesQuery,
  useGetActiveStakingPackagesQuery,
  useGetAllUserStakingPackagesQuery,
  useGetAStakingPackageQuery,
  useUpdateAStakingPackageMutation,
  useUpdateAStakingPackageStatusMutation,
  useDeleteAStakingPackageMutation,
} = airdropEventsApi;
