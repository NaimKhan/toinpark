import { apiSlice } from "..";
import {
  TGetNotificationsArgs,
  TGetNotificationsRes,
  TUnreadCountResponse,
} from "./notifications.types";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      TGetNotificationsRes,
      TGetNotificationsArgs | void
    >({
      query: (params) => ({
        url: "/v1/notifications",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Notifications"],
    }),

    getUnreadCount: builder.query<TUnreadCountResponse, void>({
      query: () => ({
        url: "/v1/notifications/unread-count",
        method: "GET",
      }),
      providesTags: ["UnreadCount"],
    }),

    markNotificationRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications", "UnreadCount"],
    }),

    markAllNotificationsRead: builder.mutation<void, void>({
      query: () => ({
        url: "/v1/notifications/mark-all-read",
        method: "POST",
      }),
      invalidatesTags: ["Notifications", "UnreadCount"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} = notificationsApi;
