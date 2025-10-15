import express, { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { getUserProfile, deleteUser } from "../controllers/userController";

const router: Router = express.Router();

/** Route to get the user's profile - requires authentication */
router.get("/profile", authenticate, getUserProfile);

/** Route to delete a user - requires authentication and admin role */
router.delete("/:id", authenticate, authorize(['admin']), deleteUser);

export default router;