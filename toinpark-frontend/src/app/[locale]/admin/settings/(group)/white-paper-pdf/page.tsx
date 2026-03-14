import { getSeoMeta } from "@/lib/getSeoMeta";
import { Separator } from "@/components/ui/separator";
import WhitePaperPDFForm from "./components/WhitePaperPDFForm";
import GradientText from "@/components/feature/text/gradientText";

export const metadata = getSeoMeta({ title: "White Paper PDF" });

export default function WhitePaperPDF() {
  return (
    <div>
      <div className="text-default-100 w-full flex items-center justify-between p-4 bg-border/50">
        <GradientText
          label="White Paper PDF"
          className="text-xl font-semibold whitespace-nowrap"
        />
      </div>

      <Separator className="bg-border mb-4 md:mb-8" />
      <div className="p-4 md:p-10">
        <WhitePaperPDFForm />
      </div>
    </div>
  );
}
