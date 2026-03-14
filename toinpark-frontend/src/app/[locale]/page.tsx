import { getSeoMeta } from "@/lib/getSeoMeta";
import LoginForm from "@/components/modules/auth/LoginForm";
import AuthBackground from "@/components/partials/AuthBackground";

export const metadata = getSeoMeta({ title: "Login" });

export default function Page() {
  return (
    <AuthBackground
      title="Welcome to TOI Community"
      description="Please enter your details to sign in to your account"
    >
      <LoginForm />
    </AuthBackground>
  );
}
