import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TGetCountriesArgs,
  TGetCountriesRes,
  TGetStatesArgs,
  TGetStatesRes,
} from "./location.types";

export const locationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<TGetCountriesRes, TGetCountriesArgs>({
      query: () => ({
        url: `/v1/countries/list`,
        method: "GET",
      }),

      providesTags: ["getCountries"],
    }),

    getStates: builder.query<TGetStatesRes, TGetStatesArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/states/list${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getStates"],
    }),
  }),
});

export const { useGetCountriesQuery, useGetStatesQuery } = locationApi;
