"use client";
import DownloadIcon from "@/components/svg/DownloadIcon";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetPdfQuery } from "@/store/api/system-settings/system-settings-api";

function DownloadWhitePaperPdf() {
  const { data: getPdfRes, ...getPdfApiState } = useGetPdfQuery();

  const getPdfData = getPdfRes?.data;

  const handleDownload = () => {
    if (!getPdfData?.url) return;

    const link = document.createElement("a");
    link.href = getPdfData.url;
    link.download = getPdfData.filename || "whitepaper.pdf";
    link.target = "_blank";
    link.click();
  };

  return (
    <>
      <div className="hidden xl:block">
        <Button
          type="button"
          color="secondary"
          className="flex items-center gap-2"
          onClick={handleDownload}
          disabled={getPdfApiState.isLoading}
        >
          <DownloadIcon className="text-primary size-5 sm:size-6" />
          <span className="hidden xl:inline">Download Whitepaper PDF</span>
        </Button>
      </div>
      <div className="!h-10 xl:!h-12 xl:hidden block">
        <Tooltip>
          <TooltipTrigger asChild className="!h-10 xl:!h-12">
            <Button
              type="button"
              color="secondary"
              className="flex items-center gap-2"
            >
              <DownloadIcon className="text-primary size-5 sm:size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download Whitepaper PDF</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
}

export default DownloadWhitePaperPdf;
