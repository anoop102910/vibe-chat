"use client";
import { useAuth } from "@/lib/context/AuthProvider";
import ChatPageComponent from "./ChatPage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SocketProvider from "@/context/SocketProvider";
export default function ChatPage() {
  const { isAuthenticated } = useAuth();

  const router = useRouter();

  const requestNotification = async () => {
      if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            console.log("Permission for notification was granted");
          } else if (permission === "denied") {
            console.log("Permission for notification was denied");
          }
      });
    }
  };
  // useEffect(() => {
  //   requestNotification();
  // }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === undefined) {
    return null;
  }

  return (
    <SocketProvider>
      <div className="p-2 bg-gray-900 h-scren w-full overflow-hidden">
        <ChatPageComponent />
      </div>
    </SocketProvider>
  );
}
