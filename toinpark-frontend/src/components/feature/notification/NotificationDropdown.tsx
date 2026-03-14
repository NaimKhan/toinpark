"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Virtuoso } from "react-virtuoso";
import { cn } from "@/lib/utils";
import AnnouncementIcon from "@/components/svg/AnnouncementIcon";
import { useSocketNotifications } from "@/hooks/useSocketNotifications";
import {
  useLazyGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/store/api/notifications/notifications-api";

import { TNotification } from "@/store/api/notifications/notifications.types";
import { useGetUserRole } from "@/hooks/feature/useGetUserRole";
import { Link } from "@/components/navigation";
import { convertUTCToLocal } from "@/lib/date-time/date-time";

export default function NotificationDropdown() {
  // 1. Enable Socket Listeners
  useSocketNotifications(
    useMemo(
      () => ({
        onNotificationReceived: (notification: TNotification) => {
          setNotifications((prev) => [notification, ...prev]);
          setShowBadge(true);
        },
      }),
      [],
    ),
  );

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState<TNotification[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [showBadge, setShowBadge] = useState(true);

  // 2. Fetch Data
  const [triggerGetNotifications, { isFetching }] =
    useLazyGetNotificationsQuery();
  const { data: unreadData } = useGetUnreadCountQuery();

  const loadMore = useCallback(
    async (nextPage: number) => {
      if (!hasMore || isFetching) return;

      try {
        const result = await triggerGetNotifications({
          page: nextPage,
          limit: 10,
        }).unwrap();

        const newItems = result?.data?.items || [];
        const meta = result?.data?.meta;

        if (nextPage === 1) {
          setNotifications(newItems);
        } else {
          setNotifications((prev) => [...prev, ...newItems]);
        }

        setHasMore(!!meta?.hasNext);
        setPage(nextPage);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    },
    [hasMore, isFetching, triggerGetNotifications],
  );

  useEffect(() => {
    if (open) {
      setPage(1);
      setHasMore(true);
      setShowBadge(true);
      loadMore(1);
    }
  }, [open]);

  // 3. Get User Role for Redirection
  const { isAdmin, isSuperAdmin } = useGetUserRole();
  const notificationPath =
    isAdmin || isSuperAdmin ? "/admin/notifications" : "/user/notifications";

  // 4. Mutations
  const [markAsRead] = useMarkNotificationReadMutation();
  const [markAllAsRead] = useMarkAllNotificationsReadMutation();

  const unreadCount = unreadData?.data?.count || 0;

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    if (isRead) return;
    try {
      await markAsRead(id).unwrap();
      // Update local state to show as read immediately
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="relative !h-10 lg:!h-12 hover:bg-primary/10 text-default-300 hover:text-primary !p-1 lg:!p-2"
        >
          <AnnouncementIcon className="size-9 cursor-pointer " />
          {showBadge && unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full border-2 border-background">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-0 border-border bg-card/95 backdrop-blur-md"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-base font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-auto px-2 py-1 text-xs text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              Mark all as read
            </Button>
          )}
        </div>

        <div className="h-[350px]">
          {notifications.length === 0 && !isFetching ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Bell className="size-8 mb-2 opacity-20" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <Virtuoso
              style={{ height: "100%" }}
              className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              data={notifications}
              endReached={() => {
                if (hasMore && !isFetching) {
                  loadMore(page + 1);
                }
              }}
              increaseViewportBy={200}
              itemContent={(index, notification) => (
                <div
                  key={notification.id as string}
                  onClick={() =>
                    handleMarkAsRead(
                      notification.id as string,
                      notification.isRead,
                    )
                  }
                  className={cn(
                    "flex flex-col gap-1 px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors cursor-pointer",
                    !notification.isRead && "bg-primary/5",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "text-sm font-medium leading-none",
                        !notification.isRead
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {notification.title}
                    </span>
                    {!notification.isRead && (
                      <div className="size-2 rounded-full bg-primary mt-1 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-default-300">
                      {convertUTCToLocal({
                        utcDateTime: notification.createdAt,
                        format: "HH:mm",
                      }) || "-"}
                    </span>
                    <span className="text-[10px] text-muted-foreground/70">
                      {convertUTCToLocal({
                        utcDateTime: notification.createdAt,
                      })}
                    </span>
                  </div>
                </div>
              )}
              components={{
                Footer: () =>
                  isFetching ? (
                    <div className="flex items-center justify-center p-4">
                      <p className="text-xs animate-pulse text-muted-foreground">
                        Loading more...
                      </p>
                    </div>
                  ) : null,
              }}
            />
          )}

          {isFetching && notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <p className="text-xs animate-pulse">Loading notifications...</p>
            </div>
          )}
        </div>
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="w-full text-xs bg-transparent hover:bg-transparent text-primary hover:text-default-100 !p-0"
            asChild
          >
            <Link href={notificationPath}>View all notifications</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
