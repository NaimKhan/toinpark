import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AllPackageForm() {
  return (
    <div>
      <form
        action=""
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-4 md:gap-6 justify-between"
      >
        <Input placeholder="User ID" className="h-12 text-sm font-light " />
        <Input placeholder="User Name" className="h-12 text-sm font-light " />
        <Input placeholder="Mobile" className="h-12 text-sm font-light " />
        <Input
          placeholder="Enter User Email"
          className="h-12 text-sm font-light "
        />
        <Input
          placeholder="Start Date"
          type="date"
          className="h-12 text-sm font-light "
        />
        <Input
          placeholder="End Date"
          type="date"
          className="h-12 text-sm font-light "
        />
        <Button
          type="submit"
          variant="default"
          className="!h-12 text-sm md:text-md font-light md:font-medium text-default-100 "
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
