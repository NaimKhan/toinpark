"use client";

import { Input } from "@/components/ui/input";
import {
  useGetSystemSettingsQuery,
  useUpdateConventionRateMutation,
} from "@/store/api/system-settings/system-settings-api";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import z from "zod";
import { showApiToast } from "@/lib/toast/api-toast";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";

const ConventionRateSchema = z.object({
  key: z.string(),
  value: z.number().positive("Conversion rate must be greater than 0"),
});

type TConventionRateForm = z.infer<typeof ConventionRateSchema>;

export default function USDTToTOINForm() {
  const { toast } = useToast();
  const { data: getSystemSettingRes } = useGetSystemSettingsQuery();
  const getSystemSettingData = getSystemSettingRes?.data;

  // Update mutation
  const [updateConventionRate, { isLoading }] =
    useUpdateConventionRateMutation();

  // React Hook Form
  const { register, handleSubmit, reset, setError, formState } =
    useForm<TConventionRateForm>({
      defaultValues: {
        key: "toinConventionRate",
        value: getSystemSettingData?.toinConventionRate ?? 0,
      },
      values: {
        key: "toinConventionRate",
        value: getSystemSettingData?.toinConventionRate ?? 0,
      },
    });

  const onSubmit = async (data: TConventionRateForm) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });

    try {
      const formData = {
        key: "toinConventionRate",
        value: `${data.value}`,
      };
      const response = await updateConventionRate({ body: formData }).unwrap();
      showApiToast({
        toastId: toastId.id,
        response,
        title: "Success",
        description: "Conversion rate updated successfully",
      });

      reset();
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, setError);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description:
          getApiMessage(error) || "Failed to update conversion rate.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-default-100"
    >
      <div className="flex flex-wrap w-full justify-center items-center gap-6 md:gap-10">
        <div className="flex-1">
          <Input
            defaultValue="1"
            label="1 – TOIN"
            labelClassName="text-base"
            className="h-12"
            readOnly
          />
        </div>

        {/* Equal Sign */}
        <span className="text-3xl font-semibold mt-8">=</span>
        <div className="flex-1">
          <Input
            required
            step="any"
            type="number"
            {...register("value", {
              required: "Value is required",
              valueAsNumber: true,
              onChange: (e) => {
                const value = Number(e.target.value);
                if (value < 0) {
                  e.target.value = "0";
                  console.log("Hello");
                }
              },
            })}
            label="USDT per TOIN"
            labelClassName="text-base"
            className="h-12"
            error={formState.errors.value?.message}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <SubmitButton
          isLoading={isLoading}
          className="text-default-900 px-6 py-2 !h-12 font-light md:font-medium w-full"
          disabled={!formState.isDirty}
        >
          Submit
        </SubmitButton>
      </div>
    </form>
  );
}
