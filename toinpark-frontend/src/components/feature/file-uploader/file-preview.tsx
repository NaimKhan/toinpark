"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import NotSupported from "./not-supported";
import { calculateFileSize } from "./utils";

function FilePreview({
  file,
  isMultiple,
  singleFullWidth,
  allowedTypes,
}: {
  file: File;
  isMultiple?: boolean;
  singleFullWidth?: boolean;
  allowedTypes?: string[];
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setImageSrc(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
        setImageSrc(null);
      };
    }
  }, [file]);

  const isAllowedFile = allowedTypes ? allowedTypes.includes(file.type) : true;

  // IMAGE PREVIEW
  if (file.type.startsWith("image/") && imageSrc && isAllowedFile) {
    return (
      <div
        className={cn("flex items-center gap-3", {
          "block w-full p-1": singleFullWidth,
        })}
      >
        <div
          className={cn("w-full", {
            "h-16 w-16": isMultiple,
            "h-[170px] w-full": singleFullWidth || !isMultiple,
          })}
        >
          <Image
            width={isMultiple ? 70 : 300}
            height={isMultiple ? 48 : 100}
            alt={file.name}
            src={imageSrc}
            className="h-full w-full rounded-md object-contain"
          />
        </div>

        {isMultiple && (
          <div>
            <h3 className="line-clamp-1 break-words font-medium text-default-200">
              {file.name}
            </h3>
            <p className="text-sm text-default-300">
              {calculateFileSize(file.size)}
            </p>
          </div>
        )}
      </div>
    );
  }

  // ALLOWED BUT NOT IMAGE (PDF, ICO, etc.)
  if (isAllowedFile) {
    return (
      <div className="flex items-center gap-3 rounded-md border p-3">
        <div className="flex-1">
          <p className="truncate text-sm font-medium text-default-200">
            {file.name}
          </p>
          <p className="text-xs text-default-300">
            {calculateFileSize(file.size)}
          </p>
        </div>
      </div>
    );
  }

  return <NotSupported />;
}

export default FilePreview;
