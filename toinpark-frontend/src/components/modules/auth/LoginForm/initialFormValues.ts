import { EUserSignUpType } from "@/store/api/auth/auth.types";
import { TLoginSchema } from "./loginSchema";

export const initialLoginFormValues: TLoginSchema = {
  type: EUserSignUpType.EMAIL,
  email: "",
  phone: "",
  password: "",
};