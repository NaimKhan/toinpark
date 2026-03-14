"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import AsyncSelect from "react-select/async";
import {
  useGetCountriesQuery,
  useGetStatesQuery,
} from "@/store/api/location/location-api";
import { useEffect, useState } from "react";
import PhoneInputComponent from "@/components/ui/phoneInput";
import PasswordInput from "@/components/ui/PasswordInput";

interface RegisteredMemberFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isEdit?: boolean;
}

export default function RegisteredMemberForm({
  form,
  onSubmit,
  isEdit = false,
}: RegisteredMemberFormProps) {
  const { register, handleSubmit, watch, setValue, formState } = form;

  const watchedCountryId = watch("countryId");
  const [country, setCountry] = useState<string | undefined>(
    watchedCountryId ? String(watchedCountryId) : undefined,
  );

  useEffect(() => {
    if (watchedCountryId) {
      setCountry(String(watchedCountryId));
    }
  }, [watchedCountryId]);

  const { data: getCountriesRes, ...getCountriesApiState } =
    useGetCountriesQuery();
  const CountriesData = getCountriesRes?.data?.items ?? [];

  const { data: getStatesRes, ...getStatesApiState } = useGetStatesQuery(
    { countryId: country },
    { skip: !country },
  );
  const StatesData = getStatesRes?.data?.items ?? [];

  const loadCountryOptions = async (inputValue: string) => {
    const filtered = CountriesData.filter((c) =>
      c.name?.toLowerCase().includes(inputValue.toLowerCase()),
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

  const stateOptions = StatesData.map((s) => ({
    value: String(s.id),
    label: s.name,
  }));

  const loadStateOptions = async (inputValue: string) => {
    const filtered = StatesData.filter((s) =>
      s.name?.toLowerCase().includes(inputValue.toLowerCase()),
    ).map((s) => ({
      value: String(s.id),
      label: s.name,
    }));

    return filtered;
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {!isEdit && (
        <Input
          label="Full Name"
          {...register("userName")}
          error={formState.errors.userName?.message as any}
        />
      )}

      <Input
        label="First Name"
        {...register("firstName")}
        error={formState.errors.firstName?.message as any}
      />

      <Input
        label="Last Name"
        {...register("lastName")}
        error={formState.errors.lastName?.message as any}
      />

      <Input
        label="Email"
        {...register("email")}
        error={formState.errors.email?.message as any}
      />

      <PhoneInputComponent
        placeholder="+1 718 555 4826"
        value={form.watch("phoneNumber")}
        onChange={(phone: string) => {
          form.setValue("phoneNumber", phone);
        }}
        label="Phone Number"
        labelClassName="text-base"
        error={form.formState.errors.phoneNumber?.message as any}
      />

      <div>
        <PasswordInput
          label="Password"
          {...register("password")}
          error={formState.errors.password?.message as any}
        />
        {isEdit && !watch("password") && (
          <p className="text-sm italic text-yellow-500 mt-1">
            Left Blank if dont want to update User Password
          </p>
        )}
      </div>

      <Input
        label="Address"
        {...register("addressLine1")}
        error={formState.errors.addressLine1?.message as any}
      />

      <Input
        label="City"
        {...register("city")}
        error={formState.errors.city?.message as any}
      />
      <LabelErrorWrapper
        label="Country"
        error={formState.errors.countryId?.message as any}
      >
        <AsyncSelect
          isLoading={getCountriesApiState?.isLoading}
          cacheOptions
          defaultOptions={countryOptions}
          loadOptions={loadCountryOptions}
          value={
            watch("countryId")
              ? countryOptions.find((o) => o.value === watch("countryId"))
              : null
          }
          onChange={(selected: any) => {
            const val = selected?.value ?? "";
            setValue("countryId", val);
            setCountry(val);
            setValue("stateId", "");
          }}
          placeholder="Select Country"
          className="react-select"
          classNamePrefix="select"
        />
      </LabelErrorWrapper>

      <LabelErrorWrapper
        label="State"
        error={formState.errors.stateId?.message as any}
      >
        <AsyncSelect
          isLoading={getStatesApiState?.isLoading}
          isDisabled={!country}
          cacheOptions
          defaultOptions={stateOptions}
          loadOptions={loadStateOptions}
          value={
            watch("stateId")
              ? stateOptions.find((o) => o.value === watch("stateId"))
              : null
          }
          onChange={(selected: any) => {
            setValue("stateId", selected?.value ?? "");
          }}
          placeholder="Select State"
          className="react-select"
          classNamePrefix="select"
        />
      </LabelErrorWrapper>

      <Input
        label="Zip Code"
        {...register("zipCode")}
        error={formState.errors.zipCode?.message as any}
      />
    </form>
  );
}
