import { useEffect } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { useAppDispatch } from "@/store/hooks";
import { notificationsApi } from "@/store/api/notifications/notifications-api";
import { TNotification } from "@/store/api/notifications/notifications.types";
import { useToast } from "@/components/ui/use-toast";

export const useSocketNotifications = (options?: {
  onNotificationReceived?: (notification: TNotification) => void;
}) => {
  const { socket, isConnected } = useSocket();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Listener: New Notification
    const handleNotification = (notification: TNotification) => {
      console.log("🔔 Socket: New Notification Received", notification);
      toast({
        variant: "success",
        title: notification.title as string,
        description: notification.message as string,
      });

      // 2. Invalidate RTK Query tags to trigger re-fetch
      dispatch(
        notificationsApi.util.invalidateTags(["Notifications", "UnreadCount"]),
      );

      // 3. Call optional callback for components with local state (like Dropdown)
      if (options?.onNotificationReceived) {
        options.onNotificationReceived(notification);
      }
    };

    // Listener: Unread Count Update
    const handleUnreadCount = (data: { count: number }) => {
      console.log("📊 Socket: Unread Count Update", data);
      dispatch(notificationsApi.util.invalidateTags(["UnreadCount"]));
    };

    // Listener: Notification Read Confirmation
    const handleNotificationRead = (data: any) => {
      console.log("✅ Socket: Notification Read", data);
      dispatch(
        notificationsApi.util.invalidateTags(["Notifications", "UnreadCount"]),
      );
    };

    socket.on("notification", handleNotification);
    socket.on("unreadCount", handleUnreadCount);
    socket.on("notificationRead", handleNotificationRead);

    return () => {
      socket.off("notification", handleNotification);
      socket.off("unreadCount", handleUnreadCount);
      socket.off("notificationRead", handleNotificationRead);
    };
  }, [socket, isConnected, dispatch, options]);
};
