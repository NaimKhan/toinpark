import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import { useDeleteASubAdminMutation } from "@/store/api/sub-admin-management/sub-admin-management-api";
import { TGetASubAdmin } from "@/store/api/sub-admin-management/sub-admin-management.types";
import { CellContext } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useDefaultLocale from "@/hooks/useDefaultLocale";

export default function ActionCell({
  row: { original },
}: CellContext<TGetASubAdmin, unknown>) {
  const { toast } = useToast();
  const local = useDefaultLocale();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteASubAdmin, { isLoading }] = useDeleteASubAdminMutation();

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we delete the Sub Admin.",
    });
    try {
      await deleteASubAdmin({ id: original.id }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "The sub admin has been deleted successfully.",
      });
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to delete sub admin.",
      });
    }
  };
  return (
    <div className="flex gap-4 justify-end items-center">
      <CommonTooltip content="Edit">
        <Link
          className="bg-transparent hover:bg-transparent p-3 h-10 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md"
          href={`/${local}/admin/settings/sub-admin-management/edit-sub-admin?id=${original.id}`}
        >
          <Edit className="size-4" />
        </Link>
      </CommonTooltip>
      <CommonTooltip content="Delete">
        <Button
          disabled={isLoading}
          onClick={() => setOpenDeleteDialog(true)}
          className="bg-transparent hover:bg-transparent p-2 h-10 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md"
        >
          <Trash2 />
        </Button>
      </CommonTooltip>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
        title={`Delete ${original?.email}`}
        description="Are you sure you want to delete this Sub Admin? This action cannot be undone."
      />
    </div>
  );
}
