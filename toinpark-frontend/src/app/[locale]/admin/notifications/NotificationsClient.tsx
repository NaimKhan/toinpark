"use client";

import GradientText from "@/components/feature/text/gradientText";
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
} from "@/store/api/notifications/notifications-api";
import RenderData from "@/components/feature/loader/RenderData";
import NotificationCard from "@/components/feature/notification/NotificationCard";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck } from "lucide-react";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetNotificationsArgs } from "@/store/api/notifications/notifications.types";

export default function AdminNotificationsClient() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetNotificationsArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: notificationsRes, ...getNotificationsState } =
    useGetNotificationsQuery({
      search: search,
      limit,
      page,
    });
  const [markAllAsRead, { isLoading: isMarkingAll }] =
    useMarkAllNotificationsReadMutation();

  const notifications = notificationsRes?.data?.items ?? [];
  const notificationsPagination = notificationsRes?.data?.meta;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  return (
    <div className="px-6 py-6 xl:px-16 md:px-10 md:py-12 space-y-8 w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-6 border-b border-border pb-6">
        <div className="space-y-4 text-start flex-1">
          <div className="flex items-center gap-3">
            <GradientText
              type="primary"
              label="Admin Notifications"
              className="text-[28px] md:text-4xl lg:text-5xl font-medium whitespace-nowrap"
            />
            {unreadCount > 0 && (
              <span className="bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full border border-primary/20">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-default-200 text-lg font-normal mx-auto">
            Stay updated with system alerts, user activities, and administrative
            tasks.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            onClick={handleMarkAllAsRead}
            disabled={isMarkingAll}
            variant="outline"
            className="flex items-center gap-2 border-primary/20 text-primary hover:bg-primary/5 h-12 px-6"
          >
            <CheckCheck className="size-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <RenderData
        expectedDataType="array"
        showEmptyState={true}
        data={notifications}
        {...getNotificationsState}
        emptyState={
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-2xl bg-muted/20">
            <div className="bg-muted p-6 rounded-full mb-6">
              <Bell className="size-12 opacity-30" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No notifications yet
            </h3>
            <p className="text-default-300">
              You&apos;re all caught up with administrative alerts.
            </p>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-1">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id as string}
              notification={notification}
            />
          ))}
        </div>
        <div>
          <BasicPagination
            isLoading={
              getNotificationsState.isLoading ||
              getNotificationsState?.isFetching
            }
            totalPages={notificationsPagination?.totalPages}
            hasNext={notificationsPagination?.hasNext}
            hasPrevious={notificationsPagination?.hasPrevious}
          />
        </div>
      </RenderData>
    </div>
  );
}
