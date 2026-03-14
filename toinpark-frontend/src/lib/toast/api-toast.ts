import { toast } from "@/components/ui/use-toast";
import { TApiResponse } from "@/store/api/common-api-types";
import type { Toast } from "@/components/ui/use-toast";

type AllowedTypes =
  | Record<string, unknown>
  | Record<string, unknown>[]
  | string[]
  | number[]
  | null
  | undefined;

type ToastWithId = Toast & {
  id?: string;
};

type ShowApiToastParams<T extends AllowedTypes> = {
  response: TApiResponse<T>;
  title: string;
  description?: string;
  errorTitle?: string;
  errorDescription?: string;
  toastId?: string;
};

export const showApiToast = <T extends AllowedTypes>({
  response,
  title,
  description,
  errorTitle,
  errorDescription,
  toastId,
}: ShowApiToastParams<T>) => {
  const isSuccess = Boolean(response?.success);

  const toastPayload: ToastWithId = {
    id: toastId,
    title: isSuccess ? title : errorTitle || "Failed",
    description: isSuccess
      ? description || response?.message
      : errorDescription || response?.message,
    variant: isSuccess ? "success" : "error",
  };

  toast(toastPayload);
};
