"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface RejectionModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (remark: string) => void;
  isLoading?: boolean;
}

export default function RejectionModal({
  open,
  onClose,
  onConfirm,
  isLoading,
}: RejectionModalProps) {
  const [remark, setRemark] = useState("");

  const handleConfirm = () => {
    onConfirm(remark);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
          setRemark("");
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reject Withdrawal Request</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this withdrawal request
            (optional).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 px-4 py-4">
          <Textarea
            placeholder="Enter rejection reason here..."
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter className="flex gap-2 px-4 pb-4">
          <Button
            variant="outline"
            onClick={() => {
              onClose();
              setRemark("");
            }}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
