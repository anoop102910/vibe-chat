import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  logoutTime: {
    type: Date,
  },
});

const Login = mongoose.model("Login", loginSchema);


export default Login;