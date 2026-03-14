import { getSeoMeta } from "@/lib/getSeoMeta";
import SubAdminManagementTable from "./SubAdminManagementTable";
import GradientText from "@/components/feature/text/gradientText";
import { Button } from "@/components/ui/button";
import useDefaultLocale from "@/hooks/useDefaultLocale";
import Link from "next/link";

export const metadata = getSeoMeta({ title: "Sub Admin Management" });

export default function SubAdminManagement() {
  const locale = useDefaultLocale();

  return (
    <div>
      <div className="text-default-100 w-full flex items-center justify-between p-4 bg-border/50">
        <GradientText
          label="Sub Admin Management"
          className="text-xl font-semibold whitespace-nowrap"
        />
        <Button className="h-10 text-sm">
          <Link
            className="text-default-900"
            href={`/${locale}/admin/settings/sub-admin-management/add-sub-admin`}
          >
            Add Sub Admin
          </Link>
        </Button>
      </div>

      <SubAdminManagementTable />
    </div>
  );
}
