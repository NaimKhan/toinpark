import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { CellContext } from "@tanstack/react-table";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import {
  SubAdminStatus,
  TGetASubAdmin,
} from "@/store/api/sub-admin-management/sub-admin-management.types";
import { useUpdateASubAdminStatusMutation } from "@/store/api/sub-admin-management/sub-admin-management-api";
import ConfirmDialog from "@/components/popup/ConfirmDialog";

export default function StatusCell({
  row: { original },
}: CellContext<TGetASubAdmin, unknown>) {
  const { toast } = useToast();
  const [UpdateSubAdminStatus, { isLoading }] =
    useUpdateASubAdminStatusMutation();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<SubAdminStatus | null>(
    null,
  );

  const handleChange = (value: string) => {
    setPendingStatus(value as SubAdminStatus);
    setOpenConfirmDialog(true);
  };

  const handleConfirmUpdate = async () => {
    if (!pendingStatus) return;

    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we update the Sub Admin status.",
    });
    try {
      await UpdateSubAdminStatus({
        id: original.id as string,
        status: pendingStatus,
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "The sub admin status has been updated successfully.",
      });
      setOpenConfirmDialog(false);
      setPendingStatus(null);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description:
          getApiMessage(error) || "Failed to update sub admin status.",
      });
    }
  };

  return (
    <>
      <Select
        disabled={isLoading}
        value={original.status}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-[140px] gap-1 px-4 !h-10 text-base text-center">
          <SelectValue placeholder="Select" />
        </SelectTrigger>

        <SelectContent>
          {Object.values(SubAdminStatus).map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => {
          setOpenConfirmDialog(false);
          setPendingStatus(null);
        }}
        onConfirm={handleConfirmUpdate}
        title="Update Sub Admin Status"
        description={`Are you sure you want to change the status to ${pendingStatus?.toLowerCase()}?`}
        confirmBtnText="Confirm"
        iconClassName="p-4 rounded-full !bg-primary/20 text-primary"
        cancleButtonClassName="flex-1 py-3"
        confirmButtonClassName="bg-primary hover:bg-primary/80 text-white flex-1 py-3"
      />
    </>
  );
}
