"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import ReferralRow from "./ReferralRow";
import { useRepeatUpForm } from "./useRepeatUpForm";
import ConfirmDialog from "@/components/popup/ConfirmDialog";

const RepeatUpForm = () => {
  const {
    form,
    fieldArray,
    editingIndex,
    hasNewItem,
    dirtyIndex,
    removeRow,
    startEdit,
    startDelete,
    cancelEdit,
    markDirty,
    confirmDiscardIfDirty,
    saveRow,
    submitNew,
    isUpdating,
    isCreating,
    openDialog,
    setOpenDialog,
    pendingActionRef,
  } = useRepeatUpForm();

  const { handleSubmit } = form;
  const { fields, append } = fieldArray;

  return (
    <>
      <form onSubmit={handleSubmit(submitNew)}>
        <div className="flex mb-4">
          <Label className="flex-1">Referral Level</Label>
          <Label className="flex-1">Commission</Label>
        </div>

        {fields.map((field, index) => (
          <ReferralRow
            key={field.id}
            field={field}
            index={index}
            totalItems={fields.length}
            register={form.register}
            remove={removeRow}
            editingIndex={editingIndex}
            isUpdating={isUpdating}
            errors={form.formState.errors}
            onEdit={(i) => startEdit(i)}
            cancelEdit={cancelEdit}
            onDelete={(apiId) => startDelete(apiId)}
            onDirty={(i) => markDirty(i)}
            onSave={(i, apiId) => saveRow(i, apiId)}
          />
        ))}

        <div className="flex items-center justify-end">
          <CommonTooltip content="Add">
            <Button
              type="button"
              className="w-12 !h-12 text-default-900 disabled:opacity-50"
              disabled={hasNewItem || dirtyIndex !== null}
              onClick={() => {
                if (hasNewItem) return;

                confirmDiscardIfDirty(() => {
                  const apiItems = fields.filter((f) => !f.isNew);
                  const last = apiItems.at(-1)?.levelNumber ?? 0;

                  append({
                    levelNumber: last + 1,
                    referralBonusPercentage: 0,
                    isNew: true,
                  });
                });
              }}
            >
              +
            </Button>
          </CommonTooltip>
        </div>

        {fields.some((f) => f.isNew) && (
          <SubmitButton
            isLoading={isCreating}
            type="submit"
            className="px-8 py-3 !h-12 text-default-900 w-full mt-6"
          >
            Submit
          </SubmitButton>
        )}
      </form>
      <ConfirmDialog
        open={openDialog}
        onClose={() => {
          pendingActionRef.current = null;
          setOpenDialog(false);
        }}
        onConfirm={() => {
          pendingActionRef.current?.();
          pendingActionRef.current = null;
          setOpenDialog(false);
        }}
      />
    </>
  );
};

export default RepeatUpForm;
