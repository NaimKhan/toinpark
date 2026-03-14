import { FieldErrors, UseFormRegister } from "react-hook-form";

export type ReferralItem = {
  apiId?: string;
  levelName?: string;
  isNew?: boolean;
  levelNumber: number;
  referralBonusPercentage: number;
};

export type FormValues = {
  items: ReferralItem[];
};

export interface ReferralRowProps {
  field: ReferralItem;
  index: number;
  totalItems: number;

  register: UseFormRegister<FormValues>;
  remove: (index: number) => void;

  editingIndex: number | null;
  isUpdating: boolean;
  errors: FieldErrors<FormValues>;

  onEdit: (index: number) => void;
  cancelEdit: () => void;
  onSave: (index: number, apiId?: string) => void;
  onDelete: (apiId?: string) => void;
  onDirty: (index: number) => void;
}
