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
      } catch (error) {
        console.log(error);
      }
      const messageToSend = await Message.findById(newMessage._id)
        .populate("sender", "_id name email")
        .populate("receiver", "_id name email");
      console.log("message saved");

      if (socketUsers.get(receiverId)) {
        console.log(messageToSend);
        console.log("message sent to ", messageToSend.receiver.name, socketUsers.get(receiverId));
        io.to(socketUsers.get(receiverId)).emit("message", messageToSend);
      }
    });

    socket.on("messages:mark-as-read", async ({ messageIds }) => {
      console.log(messageIds);
      try {
        await Message.updateMany({ _id: { $in: messageIds } }, { isRead: true });
      } catch (error) {
        console.log(error);
      }
      console.log("messages marked as read");
      io.to(socketUsers.get(socket.user._id)).emit("messages:marked-read", { messageIds });
    });

    socket.on("disconnect", () => {
      connectedUsers = connectedUsers.filter(id => id !== socket.user._id);
      socketUsers.delete(socket.user._id);
      console.log("user disconnected", socket.user.name);
    });
  });
}

export default initializeSocket;
