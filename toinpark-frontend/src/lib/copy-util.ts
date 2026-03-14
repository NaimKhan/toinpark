export type TCopySuccess = {
  success: true;
  error: null;
  message: string;
};

export type TCopyFailed = {
  success: false;
  error: unknown;
  errorMessage: string;
};

export type TCopyExtras =
  | {
      onCopySuccess?: (success: TCopySuccess) => void;
      onCopyError?: (error: TCopyFailed) => void;
    }
  | void
  | undefined;

export const copyText = async (text: string, extras: TCopyExtras) => {
  const { onCopySuccess, onCopyError } = extras || {};

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      const success: TCopySuccess = {
        success: true,
        error: null,
        message: "Copied successfully!",
      };
      onCopySuccess?.(success);
      return success;
    } catch (e) {
      console.error("Failed to copy text:", e);

      const error: TCopyFailed = {
        success: false,
        error: e,
        errorMessage:
          e instanceof Error ? (e as Error).message : "Failed to copy",
      };
      onCopyError?.(error);

      return error;
    }
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    const success: TCopySuccess = {
      success: true,
      error: null,
      message: "Copied successfully!",
    };
    onCopySuccess?.(success);
    return success;
  } catch (e) {
    console.error("Failed to copy text:", e);

    const error: TCopyFailed = {
      success: false,
      error: e,
      errorMessage:
        e instanceof Error ? (e as Error).message : "Failed to copy",
    };
    onCopyError?.(error);

    return error;
  }
};