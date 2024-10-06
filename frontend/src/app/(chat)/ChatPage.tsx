import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import UserList from "./UserList";
import ChatArea from "./ChatArea";
import GroupInfo from "./GroupInfo";
import ContactInfo from "./ContactInfo";
import { IMessage } from "@/index";
import { useSocket } from "@/context/SocketProvider";
import { useMessages } from "@/lib/services/messages";

export default function ChatPage() {
  const { messages: dbMessages, isLoading } = useMessages();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { socket } = useSocket();

  const displayNotification = (message: IMessage) => {
    if (Notification.permission === "granted") {
      new Notification(message.sender.name, {
        body: message.content,
      });
    }
  };

  useEffect(() => {
    if (dbMessages) {
      setMessages(dbMessages);
    }
  }, [dbMessages]);

  useEffect(() => {
    socket.on("message", (eventMessage: IMessage) => {
      setMessages(prevMessages => [...prevMessages, eventMessage]);
      // displayNotification(eventMessage);
    });
  
    socket.on("messages:marked-read", ({ messageIds }: { messageIds: string[] }) => {
      console.log("messages received to mark as read", messageIds);
      if (messageIds && messageIds.length > 0) {
        setMessages(prevMessages => 
          prevMessages.map(prevMessage => 
            messageIds.includes(prevMessage._id) ? { ...prevMessage, isRead: true } : prevMessage
          )
        );
      }
    });
  

    return () => {
      socket.off("message");
      socket.off("messages:marked-read");
    };
  }, [socket]);

  return (
    <div className="flex h-[calc(100vh-4px)] overflow-hidden">
      <Sidebar />
      <div className="w-80 p-1">
        <UserList messages={messages} />
      </div>
      <div className="flex-1 p-1">
        <ChatArea messages={messages} setMessages={setMessages} />
      </div>
      {/* <div className="w-80  h-screen overflow-auto p-1 space-y-2">
        <ContactInfo />
        <MemberList />
      </div> */}
    </div>
  );
}
