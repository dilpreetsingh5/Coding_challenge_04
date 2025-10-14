import { Request, Response, NextFunction } from 'express';
import { auth } from '../../../../config/firebaseConfig';
import { HTTP_STATUS } from '../../../constants/httpConstants';

/**
 * Middleware to authenticate users using Firebase ID tokens.
 * Sets res.locals.uid with the authenticated user's UID.
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: 'Authorization header missing or invalid',
    });
    return;
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    res.locals.uid = decodedToken.uid;
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: 'Invalid or expired token',
    });
  }
};
