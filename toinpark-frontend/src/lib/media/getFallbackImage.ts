import { placeholderImages } from "@/config/config";
import type { TNullish } from "@/store/api/common-api-types";

interface IGetImageFallbackProps {
  src: string | TNullish;
  fallbackImageSize?: keyof typeof placeholderImages;
  avatar?: boolean;
}

export function getFallbackImage({
  src,
  fallbackImageSize = 300,
  avatar = false
}: IGetImageFallbackProps): string {
  if (typeof src !== "string" || !src || src?.trim?.() === "") {
    if (avatar) {
      return placeholderImages?.avatar || "";
    }
    return placeholderImages?.[fallbackImageSize] || "";
  }

  return src;
}
