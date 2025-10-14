import express, { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/adminMiddleware";
import { setCustomClaims, getUserDetails } from "../controllers/adminController";

const router: Router = express.Router();

/** Route to set custom claims for a user - requires admin role */
router.post("/set-claims", authenticate, authorizeAdmin, setCustomClaims);

/** Route to get user details - requires admin role */
router.get("/user/:uid", authenticate, authorizeAdmin, getUserDetails);

export default router;
