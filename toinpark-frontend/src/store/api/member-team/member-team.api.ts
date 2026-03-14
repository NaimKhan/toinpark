import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import { TGetMemberTeamArgs, TGetMemberTeamRes } from "./member-team.types";

export const memberTeamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMemberTeam: builder.query<TGetMemberTeamRes, TGetMemberTeamArgs>({
      query: (args) => {
        const { id, ...params } = args;
        const { queryString } = generateQueryString(params);
        return {
          url: `/v1/members/${id}/direct-members${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAMember"],
    }),
  }),
});

export const { useGetMemberTeamQuery } = memberTeamApi;
