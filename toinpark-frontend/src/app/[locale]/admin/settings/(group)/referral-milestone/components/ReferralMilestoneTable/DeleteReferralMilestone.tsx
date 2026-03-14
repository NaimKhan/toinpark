import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteAReferralMilestoneMutation } from "@/store/api/referral-milestone/referral-milestone-api";
import { useState } from "react";
import { TIdOrSlugOrIdentifier, TString } from "@/store/api/common-api-types";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
interface IDeleteReferralMilestoneProps {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  referralName?: TString;
}
function DeleteReferralMilestone({
  id,
  referralName,
}: IDeleteReferralMilestoneProps) {
  const { toast } = useToast();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteAReferralMilestone, { isLoading }] =
    useDeleteAReferralMilestoneMutation();

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we delete the Referral Milestone.",
    });
    try {
      await deleteAReferralMilestone({ id }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: `The referral milestone "${referralName}" has been removed.`,
      });
    } catch (error) {
      console.info("Delete failed:", error);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to delete referral milestone.",
      });
    }
  };
  return (
    <>
      <CommonTooltip content="Delete">
        <Button
          onClick={() => setOpenDeleteDialog(true)}
          disabled={isLoading}
          className="bg-transparent hover:bg-transparent p-2 h-10 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md"
        >
          <Trash2 />
        </Button>
      </CommonTooltip>

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
        title={`Delete ${referralName} Milestone`}
        description="Are you sure you want to delete this Referral Milestone? This action cannot be undone."
      />
    </>
  );
}

export default DeleteReferralMilestone;
