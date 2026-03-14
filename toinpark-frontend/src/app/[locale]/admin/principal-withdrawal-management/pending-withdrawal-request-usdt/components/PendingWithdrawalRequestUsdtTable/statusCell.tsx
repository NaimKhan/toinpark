import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateWithdrawalStatusMutation } from "@/store/api/withdrawal-requests/withdrawal-requests-api";
import { TWithdrawalRequestItem } from "@/store/api/withdrawal-requests/withdrawal-requests.type";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import ConfirmDialog from "@/components/popup/ConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import RejectionModal from "./RejectionModal";

interface IStatusCellProps {
  row: Row<TWithdrawalRequestItem>;
}

export default function StatusCell({ row }: IStatusCellProps) {
  const { toast } = useToast();
  const [updateStatus, { isLoading }] = useUpdateWithdrawalStatusMutation();
  const data = row.original;

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openRejectionModal, setOpenRejectionModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);

  const handleStatusChange = (value: string) => {
    if (value === "PENDING") return;
    const status = value as "APPROVED" | "REJECTED";
    setPendingStatus(status);
    if (status === "REJECTED") {
      setOpenRejectionModal(true);
    } else {
      setOpenConfirmDialog(true);
    }
  };

  const handleConfirmUpdate = async (finalRemark?: string) => {
    if (!pendingStatus) return;

    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: `Please wait while we ${pendingStatus.toLowerCase()} the withdrawal request.`,
    });

    try {
      await updateStatus({
        id: data.id,
        status: pendingStatus,
        remark: finalRemark,
      }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: `Withdrawal request ${pendingStatus.toLowerCase()} successfully`,
      });
      setOpenConfirmDialog(false);
      setOpenRejectionModal(false);
      setPendingStatus(null);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to update status",
      });
    }
  };

  return (
    <div className="flex justify-center min-w-[120px]">
      <Select
        disabled={isLoading}
        onValueChange={handleStatusChange}
        value={data.status}
      >
        <SelectTrigger className="w-full !h-10 bg-primary/5 border-primary/20 text-base">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="PENDING" disabled>
              Status
            </SelectItem>
            <SelectItem value="APPROVED">Approve</SelectItem>
            <SelectItem value="REJECTED">Reject</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => {
          setOpenConfirmDialog(false);
          setPendingStatus(null);
        }}
        onConfirm={() => handleConfirmUpdate()}
        title="Update Withdrawal Status"
        description={`Are you sure you want to ${pendingStatus?.toLowerCase()} this withdrawal request?`}
        confirmBtnText="Confirm"
        iconClassName="p-4 rounded-full !bg-primary/20 text-primary"
        cancleButtonClassName="flex-1 py-3"
        confirmButtonClassName="bg-primary hover:bg-primary/80 text-white flex-1 py-3"
      />

      <RejectionModal
        open={openRejectionModal}
        isLoading={isLoading}
        onClose={() => {
          setOpenRejectionModal(false);
          setPendingStatus(null);
        }}
        onConfirm={(remark) => handleConfirmUpdate(remark)}
      />
    </div>
  );
}
