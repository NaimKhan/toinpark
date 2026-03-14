import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import { TApiResponse } from "../common-api-types";
import {
  TCreateWithdrawalRequestArgs,
  TCreateWithdrawalRequestRes,
  TGetMemberWithdrawalRequestsArgs,
  TGetWithdrawalRequestsArgs,
  TGetWithdrawalRequestsRes,
} from "./withdrawal-requests.type";

export const withdrawalRequestsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWithdrawalRequests: builder.query<
      TGetWithdrawalRequestsRes,
      TGetWithdrawalRequestsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/withdrawal-requests${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getStakingTransaction"],
    }),

    getMemberWithdrawalRequests: builder.query<
      TGetWithdrawalRequestsRes,
      TGetMemberWithdrawalRequestsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/withdrawal-requests/member${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getStakingTransaction"],
    }),

    createWithdrawalRequest: builder.mutation<
      TCreateWithdrawalRequestRes,
      TCreateWithdrawalRequestArgs
    >({
      query: (data) => ({
        url: "/v1/withdrawal-requests",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getStakingTransaction", "getAllUserStakingPackages"],
    }),

    updateWithdrawalStatus: builder.mutation<
      TApiResponse<any>,
      { id: string; status: "APPROVED" | "REJECTED"; remark?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/v1/withdrawal-requests/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["getStakingTransaction", "getAllUserStakingPackages"],
    }),
  }),
});

export const {
  useGetWithdrawalRequestsQuery,
  useGetMemberWithdrawalRequestsQuery,
  useCreateWithdrawalRequestMutation,
  useUpdateWithdrawalStatusMutation,
} = withdrawalRequestsApi;
