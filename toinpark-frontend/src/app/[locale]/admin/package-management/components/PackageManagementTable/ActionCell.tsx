import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";

import { useState } from "react";
import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";
import { useToast } from "@/components/ui/use-toast";

export default function ActionCell({ row }: { row: any }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { toast } = useToast();

  const handleDelete = () => {
    toast({
      title: "Success",
      description: "Package deleted successfully",
    });
    setOpenDeleteDialog(false);
  };

  return (
    <div className="flex justify-end items-center gap-4">
      <CommonTooltip content="View">
        <Button className="bg-transparent hover:bg-transparent p-2 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md h-10">
          <Eye />
        </Button>
      </CommonTooltip>
      <CommonTooltip content="Edit">
        <Button className="bg-transparent hover:bg-transparent p-2 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md h-10">
          <Edit />
        </Button>
      </CommonTooltip>
      <CommonTooltip content="Delete">
        <Button
          onClick={() => setOpenDeleteDialog(true)}
          className="bg-transparent hover:bg-transparent p-2  text-default-100 hover:text-primary border border-border hover:border-primary rounded-md h-10"
        >
          <Trash2 />
        </Button>
      </CommonTooltip>

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
        title={`Delete "${row.original.packageName}" Package`}
        description="Are you sure you want to delete this package? This action cannot be undone."
      />
    </div>
  );
}
