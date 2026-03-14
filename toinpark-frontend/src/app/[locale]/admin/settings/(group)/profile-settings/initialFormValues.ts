import { TUserProfile } from "@/store/api/user-profile/user-profile.types";

export const getInitialProfileValues = (user: TUserProfile) => ({
  firstName: user?.firstName || "",
  lastName: user?.lastName || "",
  email: user?.email || "",
  phoneNumber: user?.phoneNumber || "",
});
