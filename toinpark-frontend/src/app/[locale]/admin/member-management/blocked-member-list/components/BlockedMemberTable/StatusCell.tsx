import { useToast } from "@/components/ui/use-toast";
import { useUpdateMemberStatusMutation } from "@/store/api/members/members-api";
import { CellContext } from "@tanstack/react-table";
import { TMember } from "@/store/api/members/members.types";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import { Switch } from "@/components/ui/switch";
import ConfirmDialog from "@/components/popup/ConfirmDialog";
import { useState } from "react";
import StatusBadge from "@/components/feature/status/StatusBadge";

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

  const executeStatusUpdate = async () => {
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
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: `Features status for "${original?.userProfile?.firstName + " " + original?.userProfile?.lastName || "-"}" has been updated successfully.`,
      });
      setOpenConfirmDialog(false);
      setPendingStatus(null);
    } catch (error) {
      console.info("Failed to update status:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: getApiMessage(error) || "Failed to update status",
        description: "Please try again",
      });
    }
  };

  const activeStatus = original?.status === "ACTIVE";
  return (
    <div className="flex items-center justify-end gap-2">
      <StatusBadge status={original?.status || "-"} />
      <Switch
        className="cursor-pointer"
        checked={activeStatus}
        disabled={isLoading}
        onCheckedChange={(checked) =>
          handleToggle(checked ? "ACTIVE" : "BLOCKED")
        }
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => {
          setOpenConfirmDialog(false);
          setPendingStatus(null);
        }}
        onConfirm={executeStatusUpdate}
        title={pendingStatus === "ACTIVE" ? "Unblock Member" : "Block Member"}
        description={
          pendingStatus === "ACTIVE"
            ? "Are you sure you want to unblock this member? They will be able to access the system again."
            : "Are you sure you want to block this member? They will not be able to access the system."
        }
        confirmBtnText="Confirm"
        iconClassName={`p-4 rounded-full !bg-destructive/80 text-default-100`}
        cancleButtonClassName="flex-1 py-3 hover:text-default-100 hover:bg-primary/80"
        confirmButtonClassName="bg-destructive/80 hover:bg-destructive/60 text-default-100 flex-1 py-3"
      />
    </div>
  );
}
