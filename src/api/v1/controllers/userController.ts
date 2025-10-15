import { Request, Response, NextFunction } from "express";
import { UserRecord } from "firebase-admin/auth";
import { auth } from "../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Controller to get the user profile.
 * Requires authentication middleware to set res.locals.uid
 * @param req - Incoming request object.
 * @param res - Response object to send the user profile response.
 * @param next - Next middleware function.
 */
export const getUserProfile = (
    req: Request,
    res: Response,
    next: NextFunction
): Response => {
    try {
        // This will be set by your authentication middleware
        const userId: string = res.locals.uid;

        if (!userId) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                error: "User not authenticated",
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            message: `User profile for user ID: ${userId}`,
            userId: userId,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Internal server error",
        });
    }
};

/**
 * Controller to get user details from Firebase Auth.
 * Requires authentication and authorization (admin or same user).
 * @param req - Incoming request object.
 * @param res - Response object to send user details.
 * @param next - Next middleware function.
 */
export const getUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id } = req.params;

    try {
        const user: UserRecord = await auth.getUser(id);
        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: user,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Controller to delete a user (requires admin role).
 * Requires both authentication and authorization middleware
 * @param req - Incoming request object.
 * @param res - Response object to confirm deletion.
 * @param next - Next middleware function.
 */
export const deleteUser = (
    req: Request,
    res: Response,
    next: NextFunction
): Response => {
    try {
        const userId: string = req.params.id;
        const currentUserRole: string = res.locals.role;

        if (!currentUserRole) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({
                error: "User role not found",
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            message: `User ${userId} deleted by admin`,
            deletedBy: res.locals.uid,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Internal server error",
        });
    }
};
