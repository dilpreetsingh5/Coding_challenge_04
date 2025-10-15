import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../../../errors/AuthorizationError';

/**
 * Middleware to authorize users based on roles.
 * @param requiredRoles - Array of roles that are allowed
 * @param allowSameUser - If true, allows access if the user is accessing their own resource
 */
export const authorize = (requiredRoles: string[], allowSameUser: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = res.locals.role;
    const userId = res.locals.uid;
    const resourceId = req.params.id || req.params.uid;

    // Allow if user has required role
    if (requiredRoles.includes(userRole)) {
      return next();
    }

    // Allow if allowSameUser is true and user is accessing their own resource
    if (allowSameUser && userId === resourceId) {
      return next();
    }

    throw new AuthorizationError('Insufficient permissions');
  };
};
