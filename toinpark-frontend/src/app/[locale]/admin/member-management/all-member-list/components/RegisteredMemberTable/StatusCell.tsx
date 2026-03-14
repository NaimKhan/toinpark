import { useToast } from "@/components/ui/use-toast";
import { useUpdateMemberStatusMutation } from "@/store/api/members/members-api";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import { CellContext } from "@tanstack/react-table";
import { TMember } from "@/store/api/members/members.types";
import { useState } from "react";
import ConfirmDialog from "@/components/popup/ConfirmDialog";

export default function StatusCell({
  row: { original },
}: CellContext<TMember, unknown>) {
  const { toast } = useToast();
  const [updateMemberStatus, { isLoading }] = useUpdateMemberStatusMutation();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);

  const handleToggle = (status: string) => {
    setPendingStatus(status);
    setOpenConfirmDialog(true);
  };

  const handleConfirmUpdate = async () => {
    if (!pendingStatus) return;

    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we update the status",
    });

    try {
      await updateMemberStatus({
        id: original?.id,
        body: { status: pendingStatus },
      }).unwrap();

      toastId.update({
        id: toastId?.id,
        variant: "success",
        title: "Success",
        description: "Status updated successfully",
      });
      setOpenConfirmDialog(false);
      setPendingStatus(null);
    } catch (error) {
      toastId.update({
        id: toastId?.id,
        variant: "error",
        title: getApiMessage(error) || "Failed to update status",
        description: "Please try again",
      });
    }
  };

  return (
    <>
      <Select
        value={original?.status}
        onValueChange={handleToggle}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[124px] gap-1 px-4 text-base !h-12 text-center">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ACTIVE">Activate</SelectItem>
          <SelectItem value="INACTIVE">Inactivate</SelectItem>
          <SelectItem value="BLOCKED">Blocked</SelectItem>
        </SelectContent>
      </Select>

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => {
          setOpenConfirmDialog(false);
          setPendingStatus(null);
        }}
        onConfirm={handleConfirmUpdate}
        title="Update Member Status"
        description={`Are you sure you want to change the status to ${pendingStatus?.toLowerCase()}?`}
        confirmBtnText="Confirm"
        iconClassName="p-4 rounded-full !bg-primary/20 text-primary"
        cancleButtonClassName="flex-1 py-3"
        confirmButtonClassName="bg-primary hover:bg-primary/80 text-white flex-1 py-3"
      />
    </>
  );
}
