import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function applyFieldErrors<T extends FieldValues>(
  fieldErrors: Partial<Record<keyof T, string>>,
  setError: UseFormSetError<T>
) {
  (Object.entries(fieldErrors) as [keyof T, string][]).forEach(([field, message]) => {
    setError(field as Path<T>, { type: "server", message });
  });
}