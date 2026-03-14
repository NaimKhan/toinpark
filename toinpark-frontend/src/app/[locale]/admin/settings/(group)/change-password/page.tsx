import { getSeoMeta } from "@/lib/getSeoMeta";
import ChangePasswordForm from "./components/ChangePasswordForm";
import GradientText from "@/components/feature/text/gradientText";

export const metadata = getSeoMeta({ title: "Change Password" });

export default function ChangePassword() {
  return (
    <div>
      <div className="text-default-100 w-full flex items-center justify-between p-4 bg-border/50">
        <GradientText
          label="Change Login Password"
          className="text-xl font-semibold whitespace-nowrap"
        />
      </div>

      <div className="p-4 md:p-16">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
