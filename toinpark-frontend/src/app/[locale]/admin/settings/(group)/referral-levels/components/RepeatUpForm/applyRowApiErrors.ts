import { Path, ErrorOption, UseFormSetError } from "react-hook-form";
import { FormValues } from "./types";

type FlatApiErrors = Partial<
  Record<"levelNumber" | "referralBonusPercentage", string>
>;

export const applyRowErrors = (
  apiErrors: FlatApiErrors,
  rowIndex: number,
  setError: UseFormSetError<FormValues>
) => {
  (Object.entries(apiErrors) as [keyof FlatApiErrors, string][]).forEach(
    ([field, message]) => {
      if (!message) return;

      setError(`items.${rowIndex}.${field}` as Path<FormValues>, {
        type: "server",
        message,
      } satisfies ErrorOption);
    }
  );
};
