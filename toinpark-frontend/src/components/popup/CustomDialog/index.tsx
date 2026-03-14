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
import CheckCircleIcon from "@/components/svg/CheckCircleIcon";
import { cn } from "@/lib/utils";
import GradientText from "@/components/feature/text/gradientText";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConfirmationDialogProps {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  className?: string;
  title?: string;
  titleClassName?: string;
  description?: string;
  hideIcon?: boolean;
  hideCancelBtn?: boolean;
  hideConfirmBtn?: boolean;
  confirmBtnText?: string;
  cancelBtnText?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  customButtons?: React.ReactNode;
}

const CustomDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Do you want to submit",
  titleClassName,
  description,
  confirmBtnText = "Confirm",
  cancelBtnText = "Cancel",
  icon,
  hideIcon = false,
  children,
  hideCancelBtn = false,
  hideConfirmBtn = false,
  customButtons,
  className,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "sm:max-w-[400px] bg-background text-default-200 border border-border rounded-2xl",
          className
        )}
      >
        <DialogHeader className="">
          {hideIcon && (
            <DialogTitle className="text-lg font-semibold text-default-100/80 p-6 rounded-full bg-secondary w-fit">
              {icon ? icon : <CheckCircleIcon className="w-8 h-auto" />}
            </DialogTitle>
          )}
          <DialogTitle
            className={cn(
              "text-lg font-semibold text-default-200",
              titleClassName
            )}
          >
            <GradientText asChild>
              <div>{title}</div>
            </GradientText>
          </DialogTitle>
          <DialogDescription className="text-default-200 text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="overflow-y-scroll custom-scrollbar max-h-[60vh] sm:max-h-[66vh] px-4 pb-2 h-fit">
          {children}
        </ScrollArea>

        {(customButtons || onConfirm || onClose) && (
          <DialogFooter
            className={`flex justify-end gap-3 ${customButtons && "p-4"}`}
          >
            {customButtons ? (
              customButtons
            ) : (
              <>
                {!hideCancelBtn && onClose && (
                  <Button
                    // variant="default"
                    color="destructive"
                    className={`flex-1 py-3 ${cancelBtnText && "rounded-none"}`}
                    onClick={onClose}
                  >
                    {cancelBtnText}
                  </Button>
                )}

                {!hideConfirmBtn && onConfirm && (
                  <Button
                    onClick={onConfirm}
                    variant="default"
                    className="bg-transparent hover:bg-transparent  text-default-100 flex-1 py-3"
                  >
                    {confirmBtnText}
                  </Button>
                )}
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
