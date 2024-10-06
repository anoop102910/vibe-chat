import { useAuth } from "@/lib/context/AuthProvider";
import { IMessage } from "@/index";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RANDOM_IMAGE_URL } from "@/constant";
import { useSocket } from "@/context/SocketProvider";
const MessageItem = ({ message }: { message: IMessage }) => {
    const { user } = useAuth();
    
    return (
      <div
        className={`flex items-end space-x-2 mb-4 ${
          message.sender._id === user._id ? "justify-end" : "justify-start"
        }`}
      >
        <Avatar className=" rounded-lg">
          <AvatarImage src={`https://api.dicebear.com/9.x/dylan/svg?seed=${message.sender._id}`} />
          <AvatarFallback>
            {message.sender.name
              .split(" ")
              .map(n => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 bg-gray-100 p-3 rounded-xl rounded-bl-none max-w-sm">
          <div className="flex items-center mb-1">
            <span className="font-semibold text-sm mr-2">{message.sender.name}</span>
          </div>
          { <p className="text-sm">{message.content}</p>}
          {message.type === "image" && (
            <img src={RANDOM_IMAGE_URL} alt="Shared image" className="rounded-lg max-w-xs" />
          )}
          {message.type === "audio" && (
            <div className="bg-blue-100 p-2 rounded-lg inline-block">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
                  </svg>
                </Button>
                <div className="w-32 h-2 bg-blue-200 rounded-full">
                  <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-xs">0:15</span>
              </div>
            </div>
          )}
          <div className="flex justify-between">
            {message.reactions ? (
              <div className="flex space-x-1 mt-1">
                {message.reactions.map((reaction, index) => (
                  <span key={index} className="bg-gray-100 text-xs rounded-full px-2 py-1">
                    {reaction.emoji} {reaction.count}
                  </span>
                ))}
              </div>
            ) : (
              <div></div>
            )}
            {/* <div>
              <span className="text-xs text-gray-500">{message.sentAt}</span>
              {!message.isSent && <span className="text-xs text-gray-500">Sending</span>}
              {message.isDelivered && <span className="text-xs text-gray-500">Delivered</span>}
              {message.isRead && <span className="text-xs text-gray-500">Read</span>}
            </div> */}
          </div>
        </div>
      </div>
    );
  };
  
  export default MessageItem;