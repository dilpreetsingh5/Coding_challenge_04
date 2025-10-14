import express, { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/adminMiddleware";
import { getUserProfile, deleteUser } from "../controllers/userController";

const router: Router = express.Router();

/** Route to get the user's profile - requires authentication */
router.get("/profile", authenticate, getUserProfile);

/** Route to delete a user - requires authentication and admin role */
router.delete("/:id", authenticate, authorizeAdmin, deleteUser);

export default router;