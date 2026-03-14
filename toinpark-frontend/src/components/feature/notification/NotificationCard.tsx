"use client";

import { cn } from "@/lib/utils";
import { TNotification } from "@/store/api/notifications/notifications.types";
import { useMarkNotificationReadMutation } from "@/store/api/notifications/notifications-api";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import StatusBadge from "@/components/feature/status/StatusBadge";

interface NotificationCardProps {
  notification: TNotification;
}

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  const [markAsRead] = useMarkNotificationReadMutation();

  const handleMarkAsRead = async () => {
    if (notification.isRead) return;
    try {
      await markAsRead(notification.id as string).unwrap();
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  return (
    <div
      onClick={handleMarkAsRead}
      className={cn(
        "flex flex-col gap-2 p-4 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer",
        !notification.isRead && "bg-primary/5 border-primary/20 shadow-sm",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3
          className={cn(
            "text-lg font-semibold leading-tight",
            !notification.isRead ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {notification.title}
        </h3>
        {!notification.isRead && (
          <div className="size-2.5 rounded-full bg-primary mt-1.5 shrink-0" />
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {notification.message}
      </p>
      <div className="flex items-center justify-between mt-3 text-xs font-medium border-t border-border/30 pt-3">
        <div className="flex items-center gap-3 text-default-300">
          <span>
            {convertUTCToLocal({
              utcDateTime: notification.createdAt,
              format: "HH:mm",
            }) || "-"}
          </span>
          <span className="size-1 rounded-full bg-border" />
          <span>
            {convertUTCToLocal({
              utcDateTime: notification.createdAt,
            }) || "-"}
          </span>
        </div>

        <StatusBadge
          status={notification.isRead ? "READ" : "UNREAD"}
          className="text-[10px] py-1 px-3 h-auto"
        />
      </div>
    </div>
  );
}
