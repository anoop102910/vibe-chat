import { useChat } from "./useChat";
import { Button } from "@/components/ui/button";
import { Search, Phone, MoreVertical } from "lucide-react";

export default function ChatHeader() {
    const { currUser } = useChat();
    return (
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-medium">{currUser?.name}</h2>
          {/* <span className="text-sm text-gray-500">23 members, 10 online</span> */}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  };
  
