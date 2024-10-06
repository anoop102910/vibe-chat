export interface IMessage {
  _id: string;
  sender: {
    _id: string;
    name: string;
    avatar?: string;
  };
  receiver: {
    _id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  sentAt: string;
  reactions?: { emoji: string; count: number }[];
  type: "text" | "image" | "audio" | "video";
  avatar?: string;
  isSent?: boolean;
  isDelivered?: boolean;
  isRead?: boolean;
  isDeleted?: boolean;
}
export interface IUser {
  _id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  time?: string;
  unreadCount?: number;
  isTyping?: boolean;
  isSeen?: boolean;
}
