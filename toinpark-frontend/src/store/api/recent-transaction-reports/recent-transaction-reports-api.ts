import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
    TGetRecentTransactionsArgs,
    TGetRecentTransactionsRes,
} from "./recent-transaction-reports.types";

export const recentTransactionReportsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecentTransactions: builder.query<
            TGetRecentTransactionsRes,
            TGetRecentTransactionsArgs
        >({
            query: (args) => {
                const { queryString } = generateQueryString(args);
                return {
                    url: `/v1/transactions${queryString}`,
                    method: "GET",
                };
            },
            providesTags: [],
        }),
    }),
});

export const { useGetRecentTransactionsQuery } = recentTransactionReportsApi;
