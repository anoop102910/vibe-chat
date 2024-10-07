import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", isAuth, getUsers);

export default router;