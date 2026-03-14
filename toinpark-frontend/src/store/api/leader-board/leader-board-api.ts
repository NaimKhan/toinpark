import { apiSlice } from "..";
import {
    TGetToinLeaderBoardArgs,
    TGetToinLeaderBoardRes,
} from "./leader-board.type";

export const leaderBoardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getToinLeaderBoard: builder.query<
            TGetToinLeaderBoardRes,
            TGetToinLeaderBoardArgs
        >({
            query: (args) => {
                const params = new URLSearchParams();

                if (args?.page) {
                    params.append("page", String(args.page));
                }
                if (args?.limit) {
                    params.append("limit", String(args.limit));
                }
                if (args?.search) {
                    params.append("search", args.search);
                }

                return {
                    url: `/v1/dashboard/leader-board${params.toString() ? `?${params.toString()}` : ""}`,
                    method: "GET",
                };
            },
            providesTags: ["getToinLeaderBoard"],
        }),
    }),
});

export const { useGetToinLeaderBoardQuery } = leaderBoardApi;
