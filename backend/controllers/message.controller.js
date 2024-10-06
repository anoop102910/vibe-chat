import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate("sender", "_id name email")
      .populate("receiver", "_id name email");
    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching messages." });
  }
};


export const markAsRead = async (req, res) => {
  try {
    const { messageIds } = req.body;
    await Message.updateMany({ _id: { $in: messageIds } }, { isRead: true });
    res.status(200).json({ message: "Messages marked as read." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while marking messages as read." });
  }
}

