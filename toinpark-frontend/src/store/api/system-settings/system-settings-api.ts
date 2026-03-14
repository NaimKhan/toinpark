import { apiSlice } from "..";
import {
  TCreateGeneralSettingsArgs,
  TCreateGeneralSettingsRes,
  TDeleteAGeneralSettingsArgs,
  TDeleteAGeneralSettingsRes,
  TGeneralSettingsArgs,
  TGeneralSettingsRes,
  TGetAGeneralSettingsArgs,
  TGetAGeneralSettingsRes,
  TGetPdfArgs,
  TGetPdfRes,
  TUpdateConventionRateArgs,
  TUpdateConventionRateRes,
  TUpdateGeneralSettingsArgs,
  TUpdateGeneralSettingsRes,
} from "./system-settings.types";

export const systemSettingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE GENERAL SETTINGS (Optional)
    createGeneralSettings: builder.mutation<
      TCreateGeneralSettingsRes,
      TCreateGeneralSettingsArgs
    >({
      query: (data) => ({
        url: "/v1/general-settings",
        method: "POST",
        body: data,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getGeneralSettings", "getAGeneralSettings"];
        }
        return [];
      },
    }),

    // GET SYSTEM SETTINGS (all)
    getSystemSettings: builder.query<TGeneralSettingsRes, TGeneralSettingsArgs>(
      {
        query: () => ({
          url: "/v1/system-settings",
          method: "GET",
        }),

        providesTags: ["getGeneralSettings"],
      }
    ),
    // GET SYSTEM SETTINGS (all)
    getPdf: builder.query<TGetPdfRes, TGetPdfArgs>({
      query: () => ({
        url: "/v1/pdf",
        method: "GET",
      }),

      providesTags: ["getPdf"],
    }),

    // GET SINGLE GENERAL SETTING
    getAGeneralSettings: builder.query<
      TGetAGeneralSettingsRes,
      TGetAGeneralSettingsArgs
    >({
      query: ({ key }) => ({
        url: `/v1/general-settings/${key}`,
        method: "GET",
      }),

      providesTags: ["getAGeneralSettings"],
    }),

    // UPDATE SINGLE SYSTEM SETTING (Convention Rate)
    updateConventionRate: builder.mutation<
      TUpdateConventionRateRes,
      TUpdateConventionRateArgs
    >({
      query: ({ body }) => ({
        url: `/v1/system-settings/single`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getGeneralSettings"];
        }
        return [];
      },
    }),

    // UPDATE MULTIPLE GENERAL SETTINGS
    updateAGeneralSettings: builder.mutation<
      TUpdateGeneralSettingsRes,
      TUpdateGeneralSettingsArgs
    >({
      query: ({ body }) => ({
        url: `/v1/system-settings`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getGeneralSettings", "getAGeneralSettings"];
        }
        return [];
      },
    }),

    // DELETE GENERAL SETTINGS (optional)
    deleteAGeneralSettings: builder.mutation<
      TDeleteAGeneralSettingsRes,
      TDeleteAGeneralSettingsArgs
    >({
      query: ({ key }) => ({
        url: `/v1/general-settings/${key}`,
        method: "DELETE",
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getGeneralSettings", "getAGeneralSettings"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateGeneralSettingsMutation,
  useGetSystemSettingsQuery,
  useGetPdfQuery,
  useGetAGeneralSettingsQuery,
  useUpdateConventionRateMutation,
  useUpdateAGeneralSettingsMutation,
  useDeleteAGeneralSettingsMutation,
} = systemSettingsApi;
