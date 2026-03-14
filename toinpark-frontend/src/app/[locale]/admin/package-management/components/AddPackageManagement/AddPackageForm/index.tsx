import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddPackageForm() {
  return (
    <div className="space-y-5 text-default-100">
      <Input
        placeholder="Enter Investment Name"
        label="Investment Name"
        labelClassName="text-md"
        className="h-12 text-sm font-light "
      />
      <Input
        placeholder="Enter Minimum Amount"
        label="Minimum Amount"
        labelClassName="text-md"
        className="h-12 text-sm font-light "
      />
      <Input
        placeholder="Enter Maximum Amount"
        label="Maximum Amount"
        labelClassName="text-md"
        className="h-12 text-sm font-light "
      />
      <Input
        placeholder="Enter Daily Profit (%)"
        type="number"
        label="Daily Profit (%)"
        labelClassName="text-md"
        className="h-12 text-sm font-light "
      />
      <Button
        type="submit"
        variant="default"
        className="!h-12 text-sm md:text-md font-light md:font-medium text-default-100 px-6 md:px-10"
      >
        Submit
      </Button>
    </div>
  );
}
