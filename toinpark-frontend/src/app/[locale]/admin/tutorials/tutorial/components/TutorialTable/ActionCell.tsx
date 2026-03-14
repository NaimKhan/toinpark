import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { CellContext } from "@tanstack/react-table";
import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteATutorialMutation } from "@/store/api/tutorials/tutorials-api";
import EditTutorialModal from "../TutorialModals/EditTutorialModal";
import { TTutorialData } from "@/store/api/tutorials/tutorials.types";
import ShowTutorialModal from "../TutorialModals/ShowTutorialModal";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import { showApiToast } from "@/lib/toast/api-toast";

export default function ActionCell({
  row: { original },
}: CellContext<TTutorialData, unknown>) {
  const { toast } = useToast();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteATutorial, { isLoading }] = useDeleteATutorialMutation();

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });
    try {
      const response = await deleteATutorial({ id: original.id }).unwrap();

      showApiToast({
        toastId: toastId.id,
        response,
        title: "Success",
        description: `The tutorial "${original?.title}" has been permanently removed.`,
      });
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to delete tutorial.",
      });
    }
  };
  return (
    <div className="flex items-center last:justify-end gap-2">
      <ShowTutorialModal id={original?.id} />
      <EditTutorialModal id={original?.id} />
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
        title={`Delete "${original?.title}" Tutorial`}
        description="Are you sure you want to delete this tutorial? This action cannot be undone."
      />
    </div>
  );
}
