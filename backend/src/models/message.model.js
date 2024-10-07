import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sentAt: {
    type: Date,
    required: true,
  },
  deliveredAt: {
    type: Date,
  },
  readAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
  isSent: {
    type: Boolean,
  },
  isDelivered: {
    type: Boolean,
  },
  isRead: {
    type: Boolean,
  },
  isDeleted: {
    type: Boolean,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;