import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useManageSearchParams from "@/hooks/useManageSearchParams";

function DropDownMenu() {
  const { getAllParamValue, updateAParam } = useManageSearchParams();

  const handleSelect = (value: number) => {
    updateAParam({ key: "limit", value: value });
    updateAParam({ key: "page", value: undefined });
  };

  const { limit } = getAllParamValue();

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-default-100 font-medium">Show</p>

      <Select
        defaultValue={`${limit ? limit : "10"}`}
        onValueChange={(val) => handleSelect(Number(val))}
      >
        <SelectTrigger className="!h-10 !px-4 bg-transparent">
          <SelectValue placeholder="" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>

      <p className="text-sm text-default-100 font-medium">entries</p>
    </div>
  );
}

export default DropDownMenu;
