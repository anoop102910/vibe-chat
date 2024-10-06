import { Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AVATAR_URL } from "@/constant";
import { useUsers } from "@/lib/services/user";
import { IUser } from "@/index";
import { useChat } from "./useChat";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { IMessage } from "@/index";
import { useSocket } from "@/context/SocketProvider";
import { useMemo, useState } from "react";

export default function UserList({ messages }: { messages: IMessage[] }) {
  const [userInput, setUserInput] = useState<string>("");
  const { users, isLoading, error, mutate } = useUsers({ search: userInput });
  const { user: authUser } = useAuth();
  const unreadMessagesLength = useMemo(
    () =>
      messages.filter(message => !message.isRead && message.receiver._id === authUser?._id).length,
    [messages, authUser?._id]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="w-full max-w-sm  overflow-auto  bg-white rounded-l-2xl">
      <div className="flex justify-between px-4 pt-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={AVATAR_URL + authUser?.name} alt={authUser?.name} />
            <AvatarFallback>{authUser?.name}</AvatarFallback>
          </Avatar>
          <h1 className="text-lg font-semibold">{authUser?.name}</h1>
          {unreadMessagesLength > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
              {unreadMessagesLength}
            </span>
          )}
        </div>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5 text-slate-600" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)] ">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
            />
          </div>
        </div>
        <ul className="px-2">
          {!users || (users.length === 0 && <div>No users found</div>)}
          {users && users.map(user => <UserItem key={user._id} user={user} messages={messages} />)}
        </ul>
      </ScrollArea>
    </div>
  );
}

const UserItem = ({ user, messages }: { user: IUser; messages: IMessage[] }) => {
  const { socket } = useSocket();
  const { currUser, setCurrUser } = useChat();

  const handleClick = async (user: IUser) => {
    setCurrUser(user);
    if (messagesIdsToMarkAsRead.length > 0) {
      socket.emit("messages:mark-as-read", {
        messageIds: messagesIdsToMarkAsRead,
      });
    }
  };
  
  const messagesIdsToMarkAsRead :string[] = useMemo(() => {
    return messages.filter(message => message.sender._id === user._id && !message.isRead).map(mes=>mes._id);
  }, [messages]);
  const unreadMessagesCount = useMemo(
    () => messages.filter(message => message.sender._id === user._id && !message.isRead).length,
    [messages, user._id]
  );

  return (
    <div
      onClick={() => handleClick(user)}
      key={user._id}
      className={cn(
        "flex items-center gap-4 px-2 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 cursor-pointer",
        {
          "bg-red-200 hover:bg-red-200": currUser?._id === user._id,
        }
      )}
    >
      <Avatar className="h-12 w-12 rounded-lg">
        <AvatarImage src={AVATAR_URL + user.name} alt={user.name} />
        <AvatarFallback>{user.avatar}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate mb-1.5">{user.name}</p>
        <p className="text-xs text-gray-500 truncate">{user.lastMessage}</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-xs text-gray-500">{user.time}</p>
        {unreadMessagesCount > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
            {unreadMessagesCount}
          </span>
        )}
        {user.isSeen && (
          <svg
            className="h-4 w-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
  );
};
