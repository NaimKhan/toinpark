import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TGetStakingTransactionArgs,
  TGetStakingTransactionRes,
  TGetUserTransactionArgs,
  TGetUserTransactionRes,
  TGetMemberTransactionHistoryArgs,
  TGetMemberTransactionHistoryRes,
} from "./user -transaction.type";
export const userTransactionAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStakingTransaction: builder.query<
      TGetStakingTransactionRes,
      TGetStakingTransactionArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/transactions/member${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getStakingTransaction"],
    }),
    getUserTransaction: builder.query<
      TGetUserTransactionRes,
      TGetUserTransactionArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/transactions/member${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getUserWiseAllTransaction"],
    }),

    getMemberTransactionHistory: builder.query<
      TGetMemberTransactionHistoryRes,
      TGetMemberTransactionHistoryArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/transactions/admin/member-history${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getUserWiseAllTransaction"],
    }),
  }),
});

export const {
  useGetStakingTransactionQuery,
  useGetUserTransactionQuery,
  useGetMemberTransactionHistoryQuery,
} = userTransactionAPi;
