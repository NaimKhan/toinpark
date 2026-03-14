import { getSeoMeta } from "@/lib/getSeoMeta";
import RegisterForm from "@/components/modules/auth/RegisterForm";
import AuthBackground from "@/components/partials/AuthBackground";

export const metadata = getSeoMeta({ title: "Register" });

export default function SignUp() {
  return (
    <AuthBackground
      title="Create an account"
      description="Please enter the following details to create an account"
    >
      <RegisterForm />
    </AuthBackground>
  );
}
