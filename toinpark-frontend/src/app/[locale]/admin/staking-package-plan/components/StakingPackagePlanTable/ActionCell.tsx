import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import EditStakingPackageModal from "../StakingPackageModals/EditStakingPackageModal";
import { TGetAStakingPackage } from "@/store/api/staking-package/staking-package.type";
import { CellContext } from "@tanstack/react-table";
import ShowStakingPackageModal from "../StakingPackageModals/ShowStakingPackageModal";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useDeleteAStakingPackageMutation } from "@/store/api/staking-package/staking-package-api";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";

export default function ActionCell({
  row: { original },
}: CellContext<TGetAStakingPackage, unknown>) {
  const { toast } = useToast();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteAAirdropEvent, { isLoading }] =
    useDeleteAStakingPackageMutation();

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });
    try {
      await deleteAAirdropEvent({ id: original.id }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: `The Stacking Package "${original.name}" has been deleted.`,
      });
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to delete Stacking Package",
      });
    }
  };
  return (
    <div className="flex justify-end items-center gap-4">
      <ShowStakingPackageModal stakingPackageId={original.id} />

      <EditStakingPackageModal stakingPackageId={original.id} />
      <CommonTooltip content="Delete">
        <Button
          onClick={() => setOpenDeleteDialog(true)}
          disabled={isLoading}
          className="bg-transparent hover:bg-transparent p-2 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md h-10"
        >
          <Trash2 />
        </Button>
      </CommonTooltip>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
        title={`Delete "${original?.name}" Stacking Package`}
        description="Are you sure you want to delete this stacking package? This action cannot be undone."
      />
    </div>
  );
}
