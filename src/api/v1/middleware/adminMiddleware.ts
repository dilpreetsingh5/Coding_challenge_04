import { Request, Response, NextFunction } from 'express';
import { auth } from '../../../../config/firebaseConfig';
import { HTTP_STATUS } from '../../../constants/httpConstants';

/**
 * Middleware to authorize admin users.
 * Requires authentication middleware to be run first.
 * Sets res.locals.role with the user's role.
 */
export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const uid = res.locals.uid;

  if (!uid) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: 'User not authenticated',
    });
    return;
  }

  try {
    const user = await auth.getUser(uid);
    const customClaims = user.customClaims || {};

    if (customClaims.role !== 'admin') {
      res.status(HTTP_STATUS.FORBIDDEN).json({
        error: 'Admin access required',
      });
      return;
    }

    res.locals.role = customClaims.role;
    next();
  } catch (error) {
    console.error('Error fetching user claims:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to verify admin role',
    });
  }
};
