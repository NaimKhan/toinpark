import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TCreateWalletAddressArgs,
  TCreateWalletAddressRes,
  TGetAWalletAddressArgs,
  TGetAWalletAddressRes,
  TGetAllWalletAddressesArgs,
  TGetAllWalletAddressesRes,
  TUpdateWalletAddressArgs,
  TUpdateWalletAddressRes,
} from "./user-wallet-address.types";

export const userWalletAddressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUserWalletAddress: builder.mutation<
      TCreateWalletAddressRes,
      TCreateWalletAddressArgs
    >({
      query: (data) => ({
        url: "/v1/user-wallet-addresses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getUserWalletAddresses"];
        }
        return [];
      },
    }),

    getUserWalletAddresses: builder.query<
      TGetAllWalletAddressesRes,
      TGetAllWalletAddressesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/user-wallet-addresses${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getUserWalletAddresses"],
    }),

    getAUserWalletAddress: builder.query<
      TGetAWalletAddressRes,
      TGetAWalletAddressArgs
    >({
      query: ({ id }) => ({
        url: `/v1/user-wallet-addresses/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        { type: "getUserWalletAddresses", id: id === null ? undefined : id },
      ],
    }),

    updateUserWalletAddress: builder.mutation<
      TUpdateWalletAddressRes,
      TUpdateWalletAddressArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/user-wallet-addresses/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => {
        if (result?.success) {
          return [
            "getUserWalletAddresses",
            {
              type: "getUserWalletAddresses",
              id: id === null ? undefined : id,
            },
          ];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateUserWalletAddressMutation,
  useGetUserWalletAddressesQuery,
  useGetAUserWalletAddressQuery,
  useUpdateUserWalletAddressMutation,
} = userWalletAddressApi;
