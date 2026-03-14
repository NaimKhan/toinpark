"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { type INavGroupItem } from "./menus/types";
import Link from "next/link";
import { useParams } from "next/navigation";

export function NavMain({ items }: { items: INavGroupItem[] }) {
  const { locale } = useParams();
  const { open } = useSidebar();
  if (open) {
    return (
      <SidebarGroup>
        <SidebarMenu>
          {items?.map((item, index) => {
            if (!item?.items) {
              return (
                <SidebarMenuButton
                  tooltip={item?.title}
                  size="lg"
                  asChild
                  key={`group-item-${index}`}
                  isActive={item?.isActive}
                >
                  <Link href={`/${locale}${item.url}`}>
                    {item.icon && <item.icon />}
                    {open && <span>{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              );
            }
            return (
              <Collapsible
                key={`group-${index}`}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item?.title}
                      size="lg"
                      isActive={item?.isActive}
                    >
                      {item?.icon && <item.icon />}
                      {open && (
                        <>
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto mt-1 !size-5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item?.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            size="md"
                            isActive={subItem?.isActive}
                          >
                            <Link href={`/${locale}${subItem.url}`}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  // popover menu
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items?.map((item, index) => {
          if (!item?.items) {
            return (
              <SidebarMenuButton
                tooltip={item?.title}
                size="lg"
                asChild
                key={`group-item-${index}`}
                isActive={item?.isActive}
              >
                <Link href={`/${locale}${item.url}`}>
                  {item.icon && <item.icon />}
                </Link>
              </SidebarMenuButton>
            );
          }
          return (
            <Popover key={`group-item-${index}`}>
              <PopoverTrigger asChild>
                <SidebarMenuButton
                  tooltip={item?.title}
                  size="lg"
                  asChild
                  key={`group-item-${index}`}
                  isActive={item?.isActive}
                >
                  {item.icon && <item.icon />}
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="p-2">
                <SidebarMenuSub className="border-none p-0 m-0 gap-0.5">
                  {item?.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <PopoverClose asChild>
                        <SidebarMenuSubButton
                          asChild
                          size="md"
                          isActive={subItem?.isActive}
                        >
                          <Link href={`/${locale}${subItem.url}`}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </PopoverClose>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </PopoverContent>
            </Popover>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
