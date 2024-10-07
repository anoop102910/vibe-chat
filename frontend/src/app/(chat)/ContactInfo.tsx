import React from "react";
import { Phone, Video, MessageCircle, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AVATAR_URL, RANDOM_IMAGE_URL } from "@/constant";
import ChatFile from "./ChatFile";
import { Button } from "@/components/ui/button";
import { useChat } from "./useChat";

const ContactInfo = () => {
  const {currUser, isProfileOpen, setIsProfileOpen} = useChat();
  return (
    <div className="w-72 rounded-3xl p-4 bg-green-100 h-[calc(100vh-8px)] overflow-auto animate-width">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Chat Info</h2>
        <button onClick={() => setIsProfileOpen(false)} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
          <span className="sr-only">Close group info</span>
        </button>
      </div>
      <div className="flex flex-col items-center mb-4">
        <img src={AVATAR_URL + currUser?._id} alt="Profile" className="rounded-xl w-24 h-24 my-4" />
        <h3 className="font-medium mb-2 text-xl">{currUser?.name}</h3>
        <div className="flex space-x-4 mb-4">
          <button className="text-gray-500 hover:text-gray-700 px-4 py-2 border border-blue-300 rounded-lg">
            <Phone size={24} />
          </button>
          <button className="text-gray-500 hover:text-gray-700 px-4 py-2 border border-blue-300 rounded-lg">
            <Video size={24} />
          </button>
          <button className="text-gray-500 hover:text-gray-700 px-4 py-2 border border-blue-300 rounded-lg">
            <MessageCircle size={24} />
          </button>
        </div>
      </div>
      <h3 className="font-medium mb-2">Files</h3>
      <ChatFile />
    </div>
  );
};

export default ContactInfo;
