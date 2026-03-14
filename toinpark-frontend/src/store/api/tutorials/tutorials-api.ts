import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TCreateTutorialRes,
  TDeleteATutorialArgs,
  TDeleteATutorialRes,
  TGetATutorialArgs,
  TGetATutorialRes,
  TGetTutorialsArgs,
  TGetTutorialsRes,
  TUpdateFeatureTutorialArgs,
  TUpdateFeatureTutorialRes,
  TUpdateTutorialArgs,
  TUpdateTutorialRes,
} from "./tutorials.types";

export const tutorialsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTutorials: builder.mutation<TCreateTutorialRes, FormData>({
      query: (formData) => ({
        url: "/v1/tutorials",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getTutorials", "getATutorial"];
        }
        return [];
      },
    }),

    getTutorials: builder.query<TGetTutorialsRes, TGetTutorialsArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/tutorials/list${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getTutorials"],
    }),

    getFeatureTutorials: builder.query<TGetTutorialsRes, TGetTutorialsArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/tutorials/featured${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getFeatureTutorials"],
    }),

    getATutorial: builder.query<TGetATutorialRes, TGetATutorialArgs>({
      query: ({ id }) => ({
        url: `/v1/tutorials/${id}`,
        method: "GET",
      }),

      providesTags: ["getATutorial"],
    }),

    updateTutorial: builder.mutation<TUpdateTutorialRes, TUpdateTutorialArgs>({
      query: ({ body, id }) => ({
        url: `/v1/tutorials/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getTutorials", "getATutorial"];
        }
        return [];
      },
    }),
    updateFeatureTutorial: builder.mutation<
      TUpdateFeatureTutorialRes,
      TUpdateFeatureTutorialArgs
    >({
      query: ({ id }) => ({
        url: `/v1/tutorials/${id}/toggle-featured`,
        method: "PATCH",
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getTutorials", "getATutorial"];
        }
        return [];
      },
    }),

    deleteATutorial: builder.mutation<
      TDeleteATutorialRes,
      TDeleteATutorialArgs
    >({
      query: ({ id }) => ({
        url: `/v1/tutorials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getTutorials", "getATutorial"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateTutorialsMutation,
  useGetTutorialsQuery,
  useGetFeatureTutorialsQuery,
  useGetATutorialQuery,
  useUpdateTutorialMutation,
  useUpdateFeatureTutorialMutation,
  useDeleteATutorialMutation,
} = tutorialsApi;
