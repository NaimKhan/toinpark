import { TRegisterSchema } from "./registerSchema";
import { EUserSignUpType } from "@/store/api/auth/auth.types";

export const initialRegisterFormValues: TRegisterSchema = {
  type: EUserSignUpType.EMAIL,
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirmation: "",
};
