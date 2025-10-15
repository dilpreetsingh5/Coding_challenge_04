import { Request, Response, NextFunction } from 'express';
import { auth } from '../../../config/firebaseConfig';
import { AuthenticationError } from '../../../errors/AuthenticationError';

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
    throw new AuthenticationError('Authorization header missing or invalid');
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    res.locals.uid = decodedToken.uid;
    res.locals.role = decodedToken.role || 'user'; // Default to 'user' if no role
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    throw new AuthenticationError('Invalid or expired token');
  }
};
