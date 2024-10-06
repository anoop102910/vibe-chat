import { ScrollArea } from "@/components/ui/scroll-area";
import { IMessage } from "@/index";
import MessageItem from "./MessageItem";
import { useEffect, useRef } from "react";
import { useChat } from "./useChat";
export default function MessageList({ messages }: { messages: IMessage[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const {currUser} = useChat();
  
  useEffect(() => {
    if (ref.current && currUser) {
      console.log(ref.current.scrollHeight);
      ref.current.scrollTop = 600;
    }
  }, [messages, currUser]);

  return (
    <ScrollArea className="h-[calc(100vh-180px)]" ref={ref}>
      <div className="p-4">
        {messages.map(message => (
          <MessageItem key={message._id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}
