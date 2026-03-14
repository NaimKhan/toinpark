import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import StatusBadge from "@/components/feature/status/StatusBadge";

interface IStatusCellProps {
  row: any;
}

export default function StatusCell({ row }: IStatusCellProps) {
  const status = row.getValue("status");

  const handleRemarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="text-center">
      {status === "Remark" ? (
        <Dialog>
          <DialogTrigger asChild>
            {/* <StatusBadge
              onClick={handleRemarkClick}
              status={status}
              className="cursor-pointer"
            /> */}
          </DialogTrigger>
          <DialogContent className="max-w-md p-0 overflow-hidden">
            <DialogHeader className="p-5 bg-primary text-default-100">
              <DialogTitle>Withdrawal Remark</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm text-default-100 p-6">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger className="w-full !h-12">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="cancel">Cancel</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Input
                id="remark"
                type="text"
                placeholder="Write a remark"
                className="h-12 text-sm font-light"
                label="Remark"
              />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <StatusBadge status={status || "-"} />
      )}
    </div>
  );
}
