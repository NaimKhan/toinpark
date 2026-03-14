import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "./ui/sidebar";
import { useGetSystemSettings } from "@/hooks/feature/useGetSystemSettings";

function AppLogo() {
  const { getSystemSettings } = useGetSystemSettings();
  const { isMobile, open } = useSidebar();
  return (
    <div
      className={cn(
        "flex justify-center py-5 sticky top-0 bg-background z-50",
        {
          "h-[76px] flex-col justify-center": !open,
          "h-[67px] flex-col justify-center": isMobile,
        }
      )}
    >
      <Link href={"/"}>
        <Image
          src={getSystemSettings?.logoMedia?.url ?? "/images/logo/app-logo.png"}
          alt="app-logo"
          width={open ? 73 : 40}
          height={36}
          className={cn("size-10", {
            "size-9": open,
          })}
        />
      </Link>
    </div>
  );
}

export default AppLogo;
