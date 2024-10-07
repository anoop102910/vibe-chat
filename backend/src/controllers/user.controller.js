import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const filteredUsers = users.filter((user) => user._id.toString() !== req.user._id.toString());
    res.status(200).json({data:filteredUsers});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};