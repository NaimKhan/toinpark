import { TErrorResponse } from "./types";

export function isApiErrorResponse(error: unknown): error is TErrorResponse {
  return typeof error === "object" && error !== null && "data" in error;
}

export function getFieldErrors(error: TErrorResponse | unknown) {
  const errors: Record<string, string> = {};

  if (isApiErrorResponse(error) && error?.data?.errors) {
    for (const [field, messages] of Object.entries(error.data.errors)) {
      errors[field] = Array.isArray(messages) ? messages[0] : messages;
    }
  }

  return errors;
}

export function getApiMessage(error: TErrorResponse | unknown) {
  if (isApiErrorResponse(error) && error?.data?.message) {
    return error.data.message;
  }

  return "Something went wrong";
}
