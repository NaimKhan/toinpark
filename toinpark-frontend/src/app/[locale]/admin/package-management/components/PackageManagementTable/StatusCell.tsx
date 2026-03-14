import { Switch } from "@/components/ui/switch";
import { useState } from "react";

import ConfirmDialog from "@/components/popup/ConfirmDialog";
import { useToast } from "@/components/ui/use-toast";

interface IStatusCellProps {
  row: any;
}

import StatusBadge from "@/components/feature/status/StatusBadge";

export default function StatusCell({ row }: IStatusCellProps) {
  const initialStatus: boolean = row.getValue("status");
  const [status, setStatus] = useState(initialStatus);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { toast } = useToast();

  const handleToggle = () => {
    setOpenConfirmDialog(true);
  };

  const executeStatusUpdate = () => {
    const newValue = !status;
    setStatus(newValue);
    row.original.status = newValue;
    toast({
      title: "Success",
      description: `Status updated to ${newValue ? "Active" : "Inactive"}`,
    });
    setOpenConfirmDialog(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <StatusBadge status={status ? "Active" : "Inactive"} />
        <Switch
          className="cursor-pointer"
          checked={status}
          onCheckedChange={handleToggle}
        />
      </div>

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={executeStatusUpdate}
        title="Change Status"
        description={`Are you sure you want to ${status ? "deactivate" : "activate"} "${row.original.packageName}" package?`}
        confirmBtnText="Confirm"
      />
    </>
  );
}
