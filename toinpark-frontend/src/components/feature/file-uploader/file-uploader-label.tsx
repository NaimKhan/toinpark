import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import IconBorder from "@/components/svg/IconBorder";
import UploadFileIcon from "@/components/svg/UploadFileIcon";
function FileUploaderLabel({
  readonly,
  fileUploadLabelText = " SVG, PNG, JPG or GIF (max. 800x400px)",
}: {
  readonly?: boolean;
  fileUploadLabelText?: string;
}) {
  return (
    <Card
      className={cn(
        "flex h-[170px] cursor-pointer flex-col justify-center shadow-none",
        {
          "bg-[#343842]": readonly,
        }
      )}
    >
      <CardContent className="flex flex-col items-center px-6">
        <IconBorder className="h-10 w-10">
          <UploadFileIcon className="h-5 w-5 text-default-300" />
        </IconBorder>
        <h4 className="mt-3">
          <span className="text-sm font-semibold text-default-200">
            Click to upload{" "}
          </span>
          <span className="text-sm text-default-200">or drag and drop</span>
        </h4>
        <div className="mt-1 text-xs text-default-300">
          {fileUploadLabelText}
        </div>
      </CardContent>
    </Card>
  );
}

export default FileUploaderLabel;
