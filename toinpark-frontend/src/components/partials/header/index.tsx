"use client";
import GradientText from "@/components/feature/text/gradientText";
import DownloadWhitePaperPdf from "./pdf-button";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import NotificationDropdown from "@/components/feature/notification/NotificationDropdown";
// import AnnouncementButton from "./AnnouncementButton";
import Language from "./Language";
import UserProfile from "./UserProfile";
import { useGetLoggedInUser } from "@/hooks/feature/useGetLoggedInUser";
import { useGetUserRole } from "@/hooks/feature/useGetUserRole";
import { cn } from "@/lib/utils";

function Header() {
  const { isMobile, open, toggleSidebar } = useSidebar();
  const { getUser } = useGetLoggedInUser();
  const { isMember } = useGetUserRole();

  return (
    <header
      className={cn(
        "fixed top-0 start-[var(--sidebar-width)] w-[calc(100%-var(--sidebar-width))] right-0 bg-background z-50 transform-gpu translate-z-0",
        { "start-20 w-[calc(100%-80px)]": !open },
        { "start-0 w-full": isMobile }
      )}
    >
      <div className="flex-none flex items-center justify-between px-6 py-3.5 xl:px-16 md:px-10 border-b border-border">
        <div className="flex-1 hidden lg:block">
          <GradientText
            label={`Welcome ${getUser?.fullName} `}
            className="text-xl font-medium "
          />
        </div>
        {isMobile && (
          <Button
            onClick={toggleSidebar}
            size="sm"
            variant="outline"
            className="!h-10 lg:!h-12 "
          >
            <Menu className="size-5" />
          </Button>
        )}
        <div className="flex items-center justify-end gap-2 sm:gap-4 ">
          {isMember && <DownloadWhitePaperPdf />}

          <NotificationDropdown />
          {/* <AnnouncementButton /> */}

          <Language />

          <UserProfile />
        </div>
      </div>
    </header>
  );
}

export default Header;
