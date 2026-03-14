import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TCreateAirdropEventArgs,
  TCreateAirdropEventRes,
  TDeleteAAirdropEventArgs,
  TDeleteAAirdropEventRes,
  TGetAAirdropEventArgs,
  TGetAAirdropEventRes,
  TGetAirdropEventsArgs,
  TGetAirdropEventsRes,
  TUpdateAAirdropEventStatusArgs,
  TUpdateAAirdropEventStatusRes,
  TUpdateAirdropEventArgs,
  TUpdateAirdropEventRes,
} from "./airdrop-events.type";

export const airdropEventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAirdropEvent: builder.mutation<
      TCreateAirdropEventRes,
      TCreateAirdropEventArgs
    >({
      query: (data) => ({
        url: "/v1/airdrop-events",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getAirdropEvents", "getAAirdropEvent"];
        }
        return [];
      },
    }),

    getAirdropEvents: builder.query<
      TGetAirdropEventsRes,
      TGetAirdropEventsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/airdrop-events${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAirdropEvents"],
    }),

    getAAirdropEvent: builder.query<
      TGetAAirdropEventRes,
      TGetAAirdropEventArgs
    >({
      query: ({ id  }) => ({
        url: `/v1/airdrop-events/${id}`,
        method: "GET",
      }),

      providesTags: ["getAAirdropEvent"],
    }),

    updateAirdropEvent: builder.mutation<
      TUpdateAirdropEventRes,
      TUpdateAirdropEventArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/airdrop-events/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getAirdropEvents", "getAAirdropEvent"];
        }
        return [];
      },
    }),

    updateAAirdropEventStatus: builder.mutation<
      TUpdateAAirdropEventStatusRes,
      TUpdateAAirdropEventStatusArgs
    >({
      query: ({ id, body }) => ({
        url: `/v1/airdrop-events/${id}/toggle-active`,
        method: "PATCH",
        body

      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getAirdropEvents", "getAAirdropEvent"];
        }
        return [];
      },
    }),

    deleteAAirdropEvent: builder.mutation<
      TDeleteAAirdropEventRes,
      TDeleteAAirdropEventArgs
    >({
      query: ({ id }) => ({
        url: `/v1/airdrop-events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getAirdropEvents", "getAAirdropEvent"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateAirdropEventMutation,
  useGetAirdropEventsQuery,
  useGetAAirdropEventQuery,
  useUpdateAirdropEventMutation,
  useUpdateAAirdropEventStatusMutation,
  useDeleteAAirdropEventMutation,
} = airdropEventsApi;
