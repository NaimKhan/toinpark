import { getSeoMeta } from "@/lib/getSeoMeta";
import { Separator } from "@/components/ui/separator";
import AllPackageForm from "./components/AllPackageForm";
import AllPackageTable from "./components/AllPackageTable";
import GradientText from "@/components/feature/text/gradientText";

export const metadata = getSeoMeta({ title: "All Packages" });

export default function AllPackage() {
  return (
    <div className="px-6 py-8 xl:px-16 md:px-12 md:py-12">
      <div className="overflow-visible bg-card">
        <div className="mb-6 md:mb-8">
          <div className="text-default-100 uppercase w-full flex items-center justify-between">
            <GradientText
              label="Package Management"
              className="text-2xl font-semibold whitespace-nowrap"
            />
          </div>
        </div>

        <Separator className="bg-border mb-4 md:mb-8" />
        <div className="p-0">
          <AllPackageForm />
          <div className="mt-6 md:mt-20">
            <AllPackageTable />
          </div>
        </div>
      </div>
    </div>
  );
}
