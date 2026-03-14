"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";

function DeleteConfirmPopup() {
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    console.log("Item deleted!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-default-100">
      <Button
        onClick={() => setOpen(true)}
        variant="default"
        className="flex items-center gap-2 bg-destructive hover:bg-destructive/70 text-default-100"
      >
        <Trash2 size={18} />
        Delete Item
      </Button>

      {/* Reusable Delete Popup */}
      <DeleteConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to permanently remove this product?"
      />
    </div>
  );
}

export default DeleteConfirmPopup;
