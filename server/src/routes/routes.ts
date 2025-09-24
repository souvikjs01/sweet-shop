import express from "express"
import { login, register } from "../controllers/authController";
import { authenticate } from "../middlewares/middleware";
import { 
    addSweet, 
    deleteSweet, 
    listSweets, 
    purchaseSweet, 
    restockSweet, 
    searchSweets, 
    updateSweet 
} from "../controllers/sweetController";

const router = express.Router()

router.post("/auth/register", register);
router.post("/auth/login", login);

router.post("/sweets", authenticate, addSweet)
router.get("/sweets", authenticate, listSweets)
router.put("/sweets/:id", authenticate, updateSweet)
router.get("/sweets/search", authenticate, searchSweets)
router.delete("/sweets/:id", authenticate, deleteSweet)

router.post("/sweets/:id/purchase", authenticate, purchaseSweet)
router.post("/sweets/:id/restock", authenticate, restockSweet)

export default router