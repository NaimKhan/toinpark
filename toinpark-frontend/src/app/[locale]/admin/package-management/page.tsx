import { getSeoMeta } from "@/lib/getSeoMeta";
import AddPackageManagement from "./components/AddPackageManagement";
import PackageManagementTable from "./components/PackageManagementTable";

export const metadata = getSeoMeta({ title: "Package Management" });

export default function PackageManagement() {
  return (
    <div className="px-6 py-8 xl:px-16 md:px-12 md:py-12">
      <div className="overflow-visible bg-card rounded-lg shadow-sm">
        <AddPackageManagement />

        <div className="p-0">
          <PackageManagementTable />
        </div>
      </div>
    </div>
  );
}
