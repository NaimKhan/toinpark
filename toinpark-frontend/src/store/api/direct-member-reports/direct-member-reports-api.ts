import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import { TGetDirectMembersArgs, TGetDirectMembersRes } from "./direct-member-reports.types";

export const directMemberReportsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDirectMembers: builder.query<TGetDirectMembersRes, TGetDirectMembersArgs>({
            query: (args) => {
                const { queryString } = generateQueryString(args);
                return {
                    url: `/v1/members/direct-members${queryString}`,
                    method: "GET",
                };
            },
            providesTags: [],
        }),
    }),
});

export const { useGetDirectMembersQuery } = directMemberReportsApi;
