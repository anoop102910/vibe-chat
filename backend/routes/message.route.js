import { Router } from "express";
import {getMessages } from "../controllers/message.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", isAuth, getMessages);

export default router;