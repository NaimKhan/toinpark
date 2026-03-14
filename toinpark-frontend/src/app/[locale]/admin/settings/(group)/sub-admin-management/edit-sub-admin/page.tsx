import { getSeoMeta } from "@/lib/getSeoMeta";
import ManageSubAdminForm from "../components/ManageSubAdminForm";
import GradientText from "@/components/feature/text/gradientText";

export const metadata = getSeoMeta({ title: "Edit Sub Admin" });

export default function EditSubAdmin() {
  return (
    <div>
      <div className="overflow-visible bg-card">
        <div className="text-default-100 w-full flex items-center justify-between p-4 bg-border/50">
          <GradientText
            label="Edit Sub Admin Management"
            className="text-xl font-semibold whitespace-nowrap"
          />
        </div>
        <div className="p-4 md:p-10">
          <ManageSubAdminForm />
        </div>
      </div>
    </div>
  );
}
