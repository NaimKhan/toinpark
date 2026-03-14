import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import { TGetDownlineMembersArgs, TGetDownlineMembersRes } from "./downline-member-reports.type";

export const downlineMemberReportsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDownlineMembers: builder.query<TGetDownlineMembersRes, TGetDownlineMembersArgs>({
            query: (args) => {
                const { queryString } = generateQueryString(args);
                return {
                    url: `/v1/members/downline-members${queryString}`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useGetDownlineMembersQuery } = downlineMemberReportsApi;