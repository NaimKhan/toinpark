import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import FilePreview from "./file-preview";
import CrossIcon from "@/components/svg/CrossIcon";

interface FileListProps {
  files: File[];
  handleRemoveFile: (file: File) => void;
  onFileUpdate?: (index: number, newFile: File) => void;
  className?: string;
  isMultiple?: boolean;
  singleFullWidth?: boolean;
  readonly?: boolean;
  allowedTypes?: string[];
}

function FileList({
  files,
  handleRemoveFile,
  onFileUpdate,
  isMultiple,
  className,
  singleFullWidth,
  readonly,
  allowedTypes,
}: FileListProps) {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      {files.map((file, index) => (
        <div
          key={`file-${index}`}
          className={cn(
            "relative flex h-full items-center justify-between gap-3 py-2.5",
            {
              "border-b border-border": isMultiple,
              "block p-0": singleFullWidth || !isMultiple,
            }
          )}
        >
          <FilePreview
            allowedTypes={allowedTypes}
            file={file}
            isMultiple={isMultiple}
            singleFullWidth={singleFullWidth}
            // onFileUpdate={(newFile) => onFileUpdate?.(index, newFile)}
          />
          {!readonly && (
            <Button
              size="icon"
              color="destructive"
              type="button"
              onClick={() => handleRemoveFile(file)}
              // rounded={singleFullWidth || !isMultiple ? "full" : undefined}
              className={cn(
                "flex-none",
                (singleFullWidth || !isMultiple) &&
                  "absolute -right-1 -top-3 bg-destructive"
              )}
            >
              <CrossIcon className="size-3" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export default FileList;
