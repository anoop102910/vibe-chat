import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "./models/message.model.js";

function initializeSocket(server) {
  const io = new Server(server, {
    pingTimeout: 100,
    pingInterval: 100,
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });
  const socketUsers = new Map();
  let connectedUsers = [];

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          next(new Error("Authentication failed"));
        } else {
          if (connectedUsers.includes(user._id)) {
            return;
          } else {
            connectedUsers.push(user._id);
            socket.user = user;
            next();
          }
        }
      });
    } else {
      next(new Error("Authentication failed"));
    }
  });
  io.on("connection", socket => {
    console.log("A user connected ", socket.user.name);
    socketUsers.set(socket.user._id, socket.id);

    socket.on("message", async ({ receiverId, message }) => {
      console.log("message arrived");
      const newMessage = new Message({
        content: message.content,
        sender: socket.user._id,
        receiver: receiverId,
        sentAt: new Date(),
        type: message.type,
      });

      try {
        await newMessage.save();
        console.log("message saved");
      } catch (error) {
        console.log(error);
      }
      const messageToSend = await Message.findById(newMessage._id)
        .populate("sender", "_id name email")
        .populate("receiver", "_id name email");
      console.log("message fetch from db to send");

      if (socketUsers.get(receiverId)) {
        console.log(
          "message sent to ",
          messageToSend.receiver.name,
          "by",
          messageToSend.sender.name
        );
        io.to(socketUsers.get(receiverId)).emit("message", messageToSend);
        console.log("message event emitted");
      }
    });

    socket.on("messages:mark-as-read", async ({ messageIds }) => {
      console.log("messages received to mark as read", messageIds.length);
      try {
        await Message.updateMany({ _id: { $in: messageIds } }, { isRead: true });
        console.log("messages marked as read");
      } catch (error) {
        console.log(error);
      }
      console.log({ messageIds });
      io.to(socketUsers.get(socket.user._id)).emit("messages:marked-read", { messageIds });
      console.log("messages marked as read event sent");
    });

    socket.on("typing", ({receiver, isTyping }) => {
      console.log("typing event received", receiver, isTyping);
      if (socketUsers.get(receiver)) {
        io.to(socketUsers.get(receiver)).emit("typing", { sender: socket.user._id, isTyping });
      }
    });

    socket.on("disconnect", () => {
      connectedUsers = connectedUsers.filter(id => id !== socket.user._id);
      socketUsers.delete(socket.user._id);
      console.log("user disconnected", socket.user.name);
    });
  });
}

export default initializeSocket;
