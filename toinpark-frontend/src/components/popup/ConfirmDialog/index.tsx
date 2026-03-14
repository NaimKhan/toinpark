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
import InfoIcon from "@/components/svg/InfoIcon";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmBtnText?: string;
  iconClassName?: string;
  cancleButtonClassName?: string;
  confirmButtonClassName?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Unsaved Changes",
  description = "You have unsaved changes. If you continue, those changes will be discarded.",
  confirmBtnText = "Yes, Continue",
  iconClassName,
  cancleButtonClassName,
  confirmButtonClassName,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] bg-background text-default-200 border border-border rounded-xl p-4 space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div className={`p-4 rounded-full bg-primary/80 text-default-100 ${iconClassName}`}>
            <InfoIcon className="w-8 h-8" />
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
          <Button
            variant="outline"
            color="destructive"
            className={`flex-1 py-3 hover:text-default-900 ${cancleButtonClassName}`}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 bg-primary hover:bg-primary/80 text-default-900 py-3 ${confirmButtonClassName}`}
          >
            {confirmBtnText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
