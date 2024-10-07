import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const Login = mongoose.model("Login", loginSchema);

export default Login;