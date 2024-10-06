import { useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { useAuth } from "@/lib/context/AuthProvider";
import { IMessage } from "@/index";
import { Button } from "@/components/ui/button";
import { Paperclip, Mic, Send } from "lucide-react";
import { useChat } from "./useChat";


const MessageInput: React.FC<{
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}> = ({ setMessages }) => {
  const { sendMessage } = useSocket();
  const [message, setMessage] = useState("");
  const { currUser } = useChat();
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currUser && message.trim().length!==0) {
      sendMessage(currUser._id, {
        content: message,
        sentAt: new Date().toLocaleTimeString(),
        type: "text",
      });
      setMessages(prevMessages => [
        ...prevMessages,
        {
          _id: Date.now().toString(),
          sender: user,
          receiver: currUser,
          content: message,
          sentAt: new Date().toLocaleTimeString(),
          type: "text",
          isDelivered: false,
          isRead: false,
        },
      ]);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-t p-4 bg-slate-100 rounded-2xl mx-2 group">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5 text-slate-600" />
          </Button>
          <input
            placeholder="Your message"
            className="flex-1 outline-none focus:outline-none bg-slate-100 border-none p-2 "
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5" />
          </Button>
          <Button size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
