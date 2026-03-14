import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TCreateCommunityEventRes,
  TDeleteACommunityEventArgs,
  TDeleteACommunityEventRes,
  TGetACommunityEventArgs,
  TGetACommunityEventRes,
  TGetCommunityEventsArgs,
  TGetCommunityEventsRes,
  TUpdateCommunityEventArgs,
  TUpdateCommunityEventRes,
} from "./community-events.types";

export const communityEventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCommunityEvent: builder.mutation<
      TCreateCommunityEventRes,
      FormData
    >({
      query: (data) => ({
        url: "/v1/community-events",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getCommunityEvents", "getACommunityEvent"];
        }
        return [];
      },
    }),

    getCommunityEvents: builder.query<
      TGetCommunityEventsRes,
      TGetCommunityEventsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/community-events/list${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getCommunityEvents"],
    }),

    getFeaturedCommunityEvents: builder.query<
      TGetCommunityEventsRes,
      TGetCommunityEventsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/community-events/featured${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getCommunityEvents"],
    }),

    getACommunityEvent: builder.query<
      TGetACommunityEventRes,
      TGetACommunityEventArgs
    >({
      query: ({ id }) => ({
        url: `/v1/community-events/${id}`,
        method: "GET",
      }),

      providesTags: ["getACommunityEvent"],
    }),

    updateCommunityEvent: builder.mutation<
      TUpdateCommunityEventRes,
      TUpdateCommunityEventArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/community-events/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getCommunityEvents", "getACommunityEvent"];
        }
        return [];
      },
    }),

    updateCommunityEventStatus: builder.mutation<
      TUpdateCommunityEventRes,
      TUpdateCommunityEventArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/community-events/${id}/toggle-active`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getCommunityEvents", "getACommunityEvent"];
        }
        return [];
      },
    }),

     updateCommunityEventFeaturedStatus: builder.mutation<
      TUpdateCommunityEventRes,
      TUpdateCommunityEventArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/community-events/${id}/toggle-featured`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getCommunityEvents", "getACommunityEvent"];
        }
        return [];
      },
    }),

    deleteACommunityEvent: builder.mutation<
      TDeleteACommunityEventRes,
      TDeleteACommunityEventArgs
    >({
      query: ({ id }) => ({
        url: `/v1/community-events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getCommunityEvents", "getACommunityEvent"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateCommunityEventMutation,
  useGetCommunityEventsQuery,
  useGetFeaturedCommunityEventsQuery,
  useGetACommunityEventQuery,
  useUpdateCommunityEventMutation,
  useUpdateCommunityEventStatusMutation,
  useUpdateCommunityEventFeaturedStatusMutation,
  useDeleteACommunityEventMutation,
} = communityEventsApi;
