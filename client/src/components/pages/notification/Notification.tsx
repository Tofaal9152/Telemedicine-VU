"use client";
import { NotificationCenter } from "@/components/notification-center";
import { useFetchData } from "@/hooks/useFetchData";
import { deleter, patcher } from "@/lib/request";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

// 🔁 Simulated logged-in user
const currentUser = {
  id: "demo-user-id",
  role: "DOCTOR", // Change to "PATIENT" to test patient-specific notifications
  name: "Dr. John",
};

export default function Notification() {
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useFetchData<any>(
    "/notification",
    "notifications"
  );

  // 🟢 Fetch notifications
  const fetchNotifications = async () => notifications;

  // ✅ Mark one notification as read
  const markAsRead = async (id: string) => {
    await patcher(`/notification/${id}/read`, {});
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  // ✅ Mark all as read
  const markAllAsRead = async () => {
    await Promise.all(
      notifications.map((n: any) => patcher(`/notification/${n.id}/read`, {}))
    );
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  // ✅ Delete a notification
  const deleteNotification = async (id: string) => {
    await deleter(`/notification/${id}`);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  // 🔁 Poll backend every 15 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }, 15000);
    return () => clearInterval(interval);
  }, [queryClient]);

  // 🧪 Add simulated notification every 10 seconds (role-based)
  React.useEffect(() => {
    const interval = setInterval(() => {
      const newNotification =
        currentUser.role === "DOCTOR"
          ? {
              id: crypto.randomUUID(),
              title: " Patient Follow-Up Reminder",
              message: `You have follow-ups to review today.`,
              isRead: false,
              createdAt: new Date().toISOString(),
              priority: "MEDIUM",
            }
          : {
              id: crypto.randomUUID(),
              title: "💊 Medication Reminder",
              message: "Please take your medicine as prescribed.",
              isRead: false,
              createdAt: new Date().toISOString(),
              priority: "HIGH",
            };

      queryClient.setQueryData<any[]>(["notifications"], (old = []) => [
        newNotification,
        ...old,
      ]);
    }, 10000); 

    return () => clearInterval(interval);
  }, [queryClient]);

  return (
    <NotificationCenter
      variant="popover"
      fetchNotifications={fetchNotifications}
      onMarkAsRead={markAsRead}
      onMarkAllAsRead={markAllAsRead}
      onDeleteNotification={deleteNotification}
      enableRealTimeUpdates={true}
      updateInterval={15000}
      enableBrowserNotifications={true}
    />
  );
}
