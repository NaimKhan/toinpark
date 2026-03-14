import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TCreateOfficialAnnouncementArgs,
  TCreateOfficialAnnouncementRes,
  TDeleteAOfficialAnnouncementArgs,
  TDeleteAOfficialAnnouncementRes,
  TGetAOfficialAnnouncementArgs,
  TGetAOfficialAnnouncementRes,
  TGetOfficialAnnouncementsArgs,
  TGetOfficialAnnouncementsRes,
  TUpdateOfficialAnnouncementArgs,
  TUpdateOfficialAnnouncementRes,
} from "./official-announcements.types";

export const officialAnnouncementsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOfficialAnnouncement: builder.mutation<
      TCreateOfficialAnnouncementRes,
      TCreateOfficialAnnouncementArgs
    >({
      query: (data) => ({
        url: "/v1/official-announcements",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getOfficialAnnouncements", "getAOfficialAnnouncement"];
        }
        return [];
      },
    }),

    getOfficialAnnouncements: builder.query<
      TGetOfficialAnnouncementsRes,
      TGetOfficialAnnouncementsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/official-announcements${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getOfficialAnnouncements"],
    }),

    getAOfficialAnnouncement: builder.query<
      TGetAOfficialAnnouncementRes,
      TGetAOfficialAnnouncementArgs
    >({
      query: ({ id }) => ({
        url: `/v1/official-announcements/${id}`,
        method: "GET",
      }),

      providesTags: ["getAOfficialAnnouncement"],
    }),

    updateOfficialAnnouncement: builder.mutation<
      TUpdateOfficialAnnouncementRes,
      TUpdateOfficialAnnouncementArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/official-announcements/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getOfficialAnnouncements", "getAOfficialAnnouncement"];
        }
        return [];
      },
    }),

    updateOfficialAnnouncementStatus: builder.mutation<
      TUpdateOfficialAnnouncementRes,
      TUpdateOfficialAnnouncementArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/official-announcements/${id}/toggle-active`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getOfficialAnnouncements", "getAOfficialAnnouncement"];
        }
        return [];
      },
    }),

    deleteAOfficialAnnouncement: builder.mutation<
      TDeleteAOfficialAnnouncementRes,
      TDeleteAOfficialAnnouncementArgs
    >({
      query: ({ id }) => ({
        url: `/v1/official-announcements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getOfficialAnnouncements", "getAOfficialAnnouncement"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateOfficialAnnouncementMutation,
  useGetOfficialAnnouncementsQuery,
  useGetAOfficialAnnouncementQuery,
  useUpdateOfficialAnnouncementMutation,
  useUpdateOfficialAnnouncementStatusMutation,
  useDeleteAOfficialAnnouncementMutation,
} = officialAnnouncementsApi;
