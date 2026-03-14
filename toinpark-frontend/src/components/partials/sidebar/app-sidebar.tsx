"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppLogo from "@/components/AppLogo";
import { getMenus } from "./menus/menuList";
import { NavMain } from "./nav-main";
import { usePathname } from "@/components/navigation";
import { useTranslations } from "next-intl";
import { useGetUserRole } from "@/hooks/feature/useGetUserRole";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  const t = useTranslations("Menus");
  const { isSuperAdmin } = useGetUserRole();

  const menus = getMenus({
    pathname: pathName,
    isAdmin: pathName.includes("/admin"),
    isSuperAdmin,
    t,
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppLogo />
        <SidebarTrigger className="-ml-1" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menus} />
      </SidebarContent>
    </Sidebar>
  );
}
