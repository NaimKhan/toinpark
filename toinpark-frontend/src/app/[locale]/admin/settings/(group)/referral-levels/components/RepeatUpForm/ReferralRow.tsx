"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { Edit, Trash2, X } from "lucide-react";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { ReferralRowProps } from "./types";
import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";

const ReferralRow: React.FC<ReferralRowProps> = ({
  field,
  index,
  totalItems,
  register,
  remove,
  editingIndex,
  onEdit,
  cancelEdit,
  onSave,
  onDelete,
  onDirty,
  isUpdating,
  errors,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start mb-4 lg:border-0 rounded-lg">
      <div className="flex flex-row gap-4 w-full flex-1 lg:w-auto">
        <Input
          readOnly
          {...register(`items.${index}.levelNumber`)}
          className={`w-full h-12 ${
            field.isNew ? "bg-background" : "bg-muted"
          }`}
          error={errors.items?.[index]?.levelNumber?.message}
        />

        <Input
          type="number"
          required
          readOnly={field.isNew ? false : editingIndex !== index}
          {...register(`items.${index}.referralBonusPercentage`, {
            onChange: () => onDirty(index),
            valueAsNumber: true,
          })}
          className={`w-full h-12 ${
            field.isNew || editingIndex === index ? "bg-background" : "bg-muted"
          }`}
          error={errors.items?.[index]?.referralBonusPercentage?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
        {field.isNew ? (
          <CommonTooltip content="Remove">
            <Button
              type="button"
              onClick={() => remove(index)}
              className="col-span-2 lg:!size-12 text-red-500 bg-red-200 hover:bg-red-300"
            >
              <X size={16} />
            </Button>
          </CommonTooltip>
        ) : editingIndex === index ? (
          <>
            <CommonTooltip content="Cancel">
              <SubmitButton
                type="button"
                isLoading={isUpdating}
                hideLoadingContent={true}
                onClick={cancelEdit}
                className="w-full lg:!size-12 text-muted-foreground bg-muted hover:bg-muted/80"
              >
                <X size={16} />
              </SubmitButton>
            </CommonTooltip>
            <CommonTooltip content="Save">
              <SubmitButton
                type="button"
                isLoading={isUpdating}
                hideLoadingContent={true}
                onClick={() => onSave(index, field.apiId)}
                className="w-full lg:!size-12 text-green-600 bg-green-200 hover:bg-green-300"
              >
                ✔
              </SubmitButton>
            </CommonTooltip>
          </>
        ) : (
          <>
            <CommonTooltip content="Edit">
              <Button
                type="button"
                onClick={() => onEdit(index)}
                className="w-full lg:!size-12 text-primary bg-primary/30 hover:bg-primary/50"
              >
                <Edit size={16} />
              </Button>
            </CommonTooltip>
            {index === totalItems - 1 ? (
              <CommonTooltip content="Delete">
                <Button
                  type="button"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="w-full lg:!size-12 text-red-500 bg-red-200 hover:bg-red-300"
                >
                  <Trash2 size={16} />
                </Button>
              </CommonTooltip>
            ) : (
              <CommonTooltip content="You can delete only the last level">
                <Button
                  disabled
                  type="button"
                  className="w-full lg:!size-12 text-red-500 bg-red-200 hover:bg-red-300"
                >
                  <Trash2 size={16} />
                </Button>
              </CommonTooltip>
            )}
          </>
        )}
      </div>

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => onDelete(field.apiId)}
        title={`Delete Referral Level`}
        description="Are you sure you want to delete this referral level? This action cannot be undone."
      />
    </div>
  );
};
export default ReferralRow;
