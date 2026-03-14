import { TUserProfile } from "@/store/api/user-profile/user-profile.types";

export const getInitialProfileValues = (user: TUserProfile) => ({
  email: user?.email || "",
  firstName: user?.firstName || "",
  lastName: user?.lastName || "",
  phoneNumber: user?.phoneNumber || "",
  addressLine1: user?.addressLine1 || "",
  country: user?.country?.id ?? "",
  state: user?.state?.id ?? "",
  city: user?.city || "",
  zipCode: user?.zipCode || "",
  status:
    user?.isEmailVerified && user?.isPhoneNumberVerified
      ? "bothVerified"
      : user?.isEmailVerified
        ? "emailVerified"
        : user?.isPhoneNumberVerified
          ? "phoneVerified"
          : "noneVerified",
  emailDirty: false,
  phoneDirty: false,
  openVerify: false,
  verifyValue: "",
  verifyType: "email" as const,
  openStepTwo: false,
  flow: null,
  firstVerificationRes: null,
  stage: "NEW_INFO" as const,
  newInfo: "",
  otpUniqueKey: "",
  otpError: "",
});
