import React, { useEffect } from "react";
import { IMessage } from "@/index";
import { useChat } from "./useChat";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatArea({
  messages,
  setMessages,
}: {
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}) {
  const { currUser } = useChat();
  if (!currUser) return <SelectUser />;

  return (
    <div className="flex bg-white flex-col h-screen  mx-auto  rounded-r-2xl ">
      <ChatHeader />
      <MessageList
        messages={messages.filter(
          message => message.receiver._id === currUser._id || message.sender._id === currUser._id
        )}
      />
      <MessageInput setMessages={setMessages} />
    </div>
  );
}

const SelectUser = () => {
  return (
    <div className="flex bg-white flex-col h-screen  mx-auto  rounded-r-2xl justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold">Select a user to Chat</h1>
      </div>
    </div>
  );
};
