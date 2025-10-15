/**
 * Custom error class for authorization failures.
 */
export class AuthorizationError extends Error {
    public statusCode: number;

    constructor(message: string = 'Insufficient permissions') {
        super(message);
        this.name = 'AuthorizationError';
        this.statusCode = 403;
    }
}
