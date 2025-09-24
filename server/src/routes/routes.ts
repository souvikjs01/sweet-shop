import express from "express"
import { login, register } from "../controllers/authController";
import { authenticate } from "../middlewares/middleware";
import { addSweet, listSweets, updateSweet } from "../controllers/sweetController";

const router = express.Router()

router.post("/auth/register", register);
router.post("/auth/login", login);

router.post("/sweets", authenticate, addSweet)
router.get("/sweets", authenticate, listSweets)
router.put("/sweets/:id", authenticate, updateSweet)

export default router