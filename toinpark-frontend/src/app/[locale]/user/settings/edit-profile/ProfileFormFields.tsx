"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import AsyncSelect from "react-select/async";
import { TUserProfileSchema } from "./userProfileSchema";
import {
  useGetCountriesQuery,
  useGetStatesQuery,
} from "@/store/api/location/location-api";
import {
  TUserProfile,
} from "@/store/api/user-profile/user-profile.types";
import { TNullish } from "@/store/api/common-api-types";
import { useEffect, useState } from "react";

interface ProfileFormFieldsProps {
  form: UseFormReturn<TUserProfileSchema>;
  register: UseFormReturn<TUserProfileSchema>["register"];
  userProfileData: TUserProfile | TNullish;
}

export default function ProfileFormFields({
  form,
  register,
  userProfileData,
}: ProfileFormFieldsProps) {
  const [country, setCountry] = useState<string | undefined>(
    userProfileData?.country?.id
      ? String(userProfileData.country.id)
      : undefined
  );

  const { data: getCountriesRes, ...getCountriesApiState } =
    useGetCountriesQuery();
  const CountriesData = getCountriesRes?.data?.items ?? [];

  const { data: getStatesRes, ...getStatesApiState } = useGetStatesQuery(
    { countryId: country },
    { skip: !country }
  );
  const StatesData = getStatesRes?.data?.items ?? [];

  useEffect(() => {
    if (userProfileData?.country?.id) {
      setCountry(String(userProfileData.country.id));
    }
  }, [userProfileData]);

  const loadCountryOptions = async (inputValue: string) => {
    const filtered = CountriesData.filter((c) =>
      c.name?.toLowerCase().includes(inputValue.toLowerCase())
    ).map((c) => ({
      value: String(c.id),
      label: c.name,
    }));

    return filtered;
  };

  const countryOptions = CountriesData.map((c) => ({
    value: String(c.id),
    label: c.name,
  }));

  const filteredStates = StatesData.filter(
    (s) => String(s.countryId) === String(country)
  );

  const stateOptions = filteredStates.map((s) => ({
    value: String(s.id),
    label: s.name,
  }));

  const loadStateOptions = async (inputValue: string) => {
    const filtered = filteredStates
      .filter((s) => s.name?.toLowerCase().includes(inputValue.toLowerCase()))
      .map((s) => ({
        value: String(s.id),
        label: s.name,
      }));

    return filtered;
  };

  return (
    <>
      <Input
        id="toinAccountNumber"
        value={userProfileData?.toinAccountNumber ?? ""}
        label="TOI Account ID"
        disabled
      />

      <Input
        id="addressLine1"
        {...register("addressLine1")}
        placeholder="Enter Address"
        label="Address"
        error={form.formState.errors.addressLine1?.message}
      />

      <Input
        id="firstName"
        {...register("firstName")}
        placeholder="Mr. John"
        label="First Name"
        error={form.formState.errors.firstName?.message}
      />

      {/* COUNTRY */}
      <LabelErrorWrapper
        label="Country"
        error={form.formState.errors.country?.message}
      >
        <AsyncSelect
          isLoading={getCountriesApiState?.isLoading}
          cacheOptions
          defaultOptions={countryOptions}
          loadOptions={loadCountryOptions}
          value={
            form.watch("country")
              ? countryOptions.find((o) => o.value === form.watch("country"))
              : null
          }
          onChange={(selected: any) => {
            const val = selected?.value ?? "";
            form.setValue("country", val);
            setCountry(val);
            form.setValue("state", "");
          }}
          placeholder="Select Country"
          className="react-select"
          classNamePrefix="select"
        />
      </LabelErrorWrapper>

      <Input
        id="lastName"
        {...register("lastName")}
        placeholder="Abraham"
        label="Last Name"
        error={form.formState.errors.lastName?.message}
      />

      {/* STATE */}
      <LabelErrorWrapper
        label="State"
        error={form.formState.errors.state?.message}
      >
        <AsyncSelect
          isLoading={getStatesApiState?.isLoading}
          isDisabled={!country}
          cacheOptions
          defaultOptions={stateOptions}
          loadOptions={loadStateOptions}
          value={
            form.watch("state")
              ? stateOptions.find((o) => o.value === form.watch("state"))
              : null
          }
          onChange={(selected: any) => {
            form.setValue("state", selected?.value ?? "");
          }}
          placeholder="Select State"
          className="react-select"
          classNamePrefix="select"
        />
      </LabelErrorWrapper>

      <Input
        id="city"
        {...register("city")}
        placeholder="Brooklyn"
        label="City"
        error={form.formState.errors.city?.message}
      />

      <Input
        id="zipCode"
        {...register("zipCode")}
        placeholder="11215"
        label="Zip Code"
        error={form.formState.errors.zipCode?.message}
      />
    </>
  );
}
