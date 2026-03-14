"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TrashIcon from "@/components/svg/TrashIcon";

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading?: boolean;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] bg-background text-default-200 border border-border rounded-xl p-4 space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-destructive/80 text-default-100">
            <TrashIcon className="w-8 h-8" />
          </div>
        </div>

        <DialogHeader className="text-center space-y-2 rounded-md bg-transparent">
          <DialogTitle className="text-xl font-semibold text-default-100">
            {title}
          </DialogTitle>

          <DialogDescription className="text-default-200 text-sm font-normal leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Buttons */}
        <DialogFooter className="flex justify-end gap-3 mb-0">
          <Button variant="outline" className="flex-1 py-3" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 bg-destructive hover:bg-destructive/80 text-default-100 py-3"
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
