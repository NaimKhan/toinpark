import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PhoneInputComponent from "@/components/ui/phoneInput";
import { UseFormReturn } from "react-hook-form";
import { TUserProfile } from "@/store/api/user-profile/user-profile.types";
import { TNullish } from "@/store/api/common-api-types";
import { TUserProfileSchema } from "./userProfileSchema";
import VerifyContactModal from "./modals/VerifyContactModal";
import StepTwoVerifyContactModal from "./modals/StepTwoVerifyContactModal";
import { useSignoutMutation } from "@/store/api/auth/auth-api";

interface ProfileFormFieldsProps {
  form: UseFormReturn<TUserProfileSchema>;
  register: UseFormReturn<TUserProfileSchema>["register"];
  userProfileData: TUserProfile | TNullish;
}

function PhoneAndEmailFormFields({
  form,
  register,
  userProfileData,
}: ProfileFormFieldsProps) {
  const [signout, { isLoading }] = useSignoutMutation();

  const email = form.watch("email") ?? "";
  const phone = form.watch("phoneNumber") ?? "";

  const emailDirty = form.watch("emailDirty");
  const phoneDirty = form.watch("phoneDirty");
  const openVerify = form.watch("openVerify");
  const verifyValue = form.watch("verifyValue");
  const verifyType = form.watch("verifyType");
  const openStepTwo = form.watch("openStepTwo");
  const flow = form.watch("flow");
  const firstVerificationRes = form.watch("firstVerificationRes");

  const status = form.watch("status");
  const isEmailVerified =
    status === "emailVerified" || status === "bothVerified";
  const isPhoneVerified =
    status === "phoneVerified" || status === "bothVerified";

  const bothVerified = status === "bothVerified";

  const emailButton = {
    showChange: isEmailVerified,
    showVerify: !isEmailVerified && userProfileData?.email,
    showAdd: !isEmailVerified && !userProfileData?.email,
    disabled: false,
  };

  const phoneButton = {
    showChange: isPhoneVerified,
    showVerify: !isPhoneVerified && userProfileData?.phoneNumber,
    showAdd: !isPhoneVerified && !userProfileData?.phoneNumber,
    disabled: false,
  };

  const setOpenStepTwo = (val: boolean | ((prev: boolean) => boolean)) => {
    const newVal = typeof val === "function" ? val(openStepTwo || false) : val;
    form.setValue("openStepTwo", newVal);
  };
  const setFirstVerificationRes = (val: any) => {
    form.setValue("firstVerificationRes", val);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row gap-10 px-6 py-10 md:px-10 xl:px-16 md:py-12">
        <Input
          {...register("email", {
            onChange: () => form.setValue("emailDirty", true),
          })}
          label="Email"
          readOnly
          placeholder="Enter your email"
          rightContent={
            emailButton.showChange ? (
              <Button
                type="button"
                disabled={emailButton.disabled}
                onClick={() => {
                  form.setValue(
                    "verifyValue",
                    userProfileData?.email as string,
                  );
                  form.setValue("verifyType", "email");
                  form.setValue("flow", bothVerified ? "CASE_2" : "CASE_1");
                  form.setValue("openVerify", true);
                }}
              >
                Change
              </Button>
            ) : emailButton.showVerify ? (
              <Button
                type="button"
                disabled={emailButton.disabled}
                onClick={() => {
                  form.setValue("verifyValue", email);
                  form.setValue("verifyType", "email");
                  form.setValue("openVerify", true);
                }}
              >
                Verify
              </Button>
            ) : emailButton.showAdd ? (
              <Button
                type="button"
                disabled={emailButton.disabled}
                onClick={() => {
                  form.setValue("verifyValue", "");
                  form.setValue("verifyType", "email");
                  form.setValue("flow", "CASE_3");
                  form.setValue("firstVerificationRes", null);
                  form.setValue("openStepTwo", true);
                }}
              >
                Add
              </Button>
            ) : null
          }
        />

        <PhoneInputComponent
          value={phone}
          placeholder="Enter your phone number"
          onChange={(val: string) => {
            form.setValue("phoneDirty", true);
            form.setValue("phoneNumber", val);
          }}
          label="Phone Number"
          readOnly
          error={form.formState.errors.phoneNumber?.message}
          rightContent={
            phoneButton.showChange ? (
              <Button
                type="button"
                disabled={phoneButton.disabled}
                onClick={() => {
                  form.setValue(
                    "verifyValue",
                    userProfileData?.phoneNumber as string,
                  );
                  form.setValue("verifyType", "phone");
                  form.setValue("flow", bothVerified ? "CASE_2" : "CASE_1");
                  form.setValue("openVerify", true);
                }}
              >
                Change
              </Button>
            ) : phoneButton.showVerify ? (
              <Button
                type="button"
                disabled={phoneButton.disabled}
                onClick={() => {
                  form.setValue("verifyValue", phone);
                  form.setValue("verifyType", "phone");
                  form.setValue("openVerify", true);
                }}
              >
                Verify
              </Button>
            ) : phoneButton.showAdd ? (
              <Button
                type="button"
                disabled={phoneButton.disabled}
                onClick={() => {
                  form.setValue("verifyValue", "");
                  form.setValue("verifyType", "phone");
                  form.setValue("flow", "CASE_3");
                  form.setValue("firstVerificationRes", null);
                  form.setValue("openStepTwo", true);
                }}
              >
                Add
              </Button>
            ) : null
          }
        />
      </div>

      <VerifyContactModal
        open={openVerify || false}
        value={verifyValue || ""}
        type={verifyType || "email"}
        flow={flow || null}
        onClose={() => {
          form.setValue("openVerify", false);
          form.setValue("otpError", "");
        }}
        setOpenStepTwo={setOpenStepTwo}
        setFirstVerificationRes={setFirstVerificationRes}
        form={form}
      />

      {openStepTwo && (
        <StepTwoVerifyContactModal
          open={openStepTwo || false}
          value={firstVerificationRes}
          type={verifyType || "email"}
          flow={flow || null}
          form={form}
          onClose={() => {
            form.setValue("openStepTwo", false);
            form.setValue("verifyValue", "");
            form.setValue("flow", null);
            form.setValue("stage", "NEW_INFO");
            form.setValue("newInfo", "");
            form.setValue("otpUniqueKey", "");
            form.setValue("otpError", "");
          }}
          setOpenStepTwo={setOpenStepTwo}
          setFirstVerificationRes={setFirstVerificationRes}
        />
      )}
    </div>
  );
}

export default PhoneAndEmailFormFields;
