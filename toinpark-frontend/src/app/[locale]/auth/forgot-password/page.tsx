import { getSeoMeta } from "@/lib/getSeoMeta";
import ForgotPasswordForm from "@/components/modules/auth/ForgotPasswordForm";
import AuthBackground from "@/components/partials/AuthBackground";

export const metadata = getSeoMeta({ title: "Forgot Password" });

export default function ForgotPassword() {
  return (
    <AuthBackground
      title="Forgot password?"
      description="Please enter your email or phone number to reset password"
    >
      <ForgotPasswordForm />
    </AuthBackground>
  );
}
