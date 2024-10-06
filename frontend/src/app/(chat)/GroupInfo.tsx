import React from "react";
import ChatFile from "./ChatFile";
import { X } from "lucide-react";
interface FileType {
  type: string;
  count: number;
  icon: React.ReactNode;
  expanded?: boolean;
}

export default function GroupInfo() {
  const [expandedTypes, setExpandedTypes] = React.useState<string[]>(["photos"]);

  const toggleExpanded = (type: string) => {
    setExpandedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="w-72  rounded-3xl p-4 bg-green-100 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Group Info</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <X size={20} />
          <span className="sr-only">Close group info</span>
        </button>
      </div>
      <h3 className="font-medium mb-2">Files</h3>
      <ChatFile />
    </div>
  );
}
