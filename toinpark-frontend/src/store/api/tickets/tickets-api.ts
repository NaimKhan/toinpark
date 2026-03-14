import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TCreateATicketsArgs,
  TCreateATicketsRes,
  TDeleteATicketArgs,
  TDeleteATicketRes,
  TGetATicketArgs,
  TGetATicketRes,
  TGetMyTicketsArgs,
  TGetMyTicketsRes,
  TGetTicketsArgs,
  TGetTicketsRes,
  TReplayATicketArgs,
  TReplayATicketRes,
  TUpdateTicketPriorityArgs,
  TUpdateTicketPriorityRes,
  TUpdateTicketStatusArgs,
  TUpdateTicketStatusRes,
} from "./tickets.types";

export const ticketsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createATicket: builder.mutation<TCreateATicketsRes, TCreateATicketsArgs>({
      query: (data) => ({
        url: "/v1/tickets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getMyTickets", "getTickets"];
        }
        return [];
      },
    }),
    replayATicket: builder.mutation<TReplayATicketRes, TReplayATicketArgs>({
      query: ({ message, id }) => ({
        url: `/v1/tickets/${id}/reply`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getMyTickets", "getATicket", "getTickets"];
        }
        return [];
      },
    }),
    UpdateTicketStatus: builder.mutation<
      TUpdateTicketStatusRes,
      TUpdateTicketStatusArgs
    >({
      query: ({ status, id }) => ({
        url: `/v1/tickets/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getMyTickets", "getATicket", "getTickets"];
        }
        return [];
      },
    }),
    UpdateTicketPriority: builder.mutation<
      TUpdateTicketPriorityRes,
      TUpdateTicketPriorityArgs
    >({
      query: ({ priority, id }) => ({
        url: `/v1/tickets/${id}/priority`,
        method: "PATCH",
        body: { priority },
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getMyTickets", "getATicket", "getTickets"];
        }
        return [];
      },
    }),

    getATicket: builder.query<TGetATicketRes, TGetATicketArgs>({
      query: ({ id }) => ({
        url: `/v1/tickets/${id}`,
        method: "GET",
      }),

      providesTags: ["getATicket"],
    }),
    getTickets: builder.query<TGetTicketsRes, TGetTicketsArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return { url: `/v1/tickets/list${queryString}`, method: "GET" };
      },

      providesTags: ["getTickets"],
    }),

    getMyTickets: builder.query<TGetMyTicketsRes, TGetMyTicketsArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return { url: `/v1/tickets/my-tickets${queryString}`, method: "GET" };
      },

      providesTags: ["getMyTickets"],
    }),
    deleteATicket: builder.mutation<TDeleteATicketRes, TDeleteATicketArgs>({
      query: ({ id }) => ({
        url: `/v1/tickets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getMyTickets", "getATicket", "getTickets"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateATicketMutation,
  useReplayATicketMutation,
  useUpdateTicketStatusMutation,
  useUpdateTicketPriorityMutation,
  useDeleteATicketMutation,
  useGetTicketsQuery,
  useGetATicketQuery,
  useGetMyTicketsQuery,
} = ticketsApi;
