import express, { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { setCustomClaims, getUserDetails } from "../controllers/adminController";

const router: Router = express.Router();

/** Route to set custom claims for a user - requires admin role */
router.post("/setCustomClaims", authenticate, authorize(['admin']), setCustomClaims);

/** Route to get user details - requires admin role */
router.get("/user/:uid", authenticate, authorize(['admin']), getUserDetails);

export default router;
