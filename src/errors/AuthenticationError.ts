/**
 * Custom error class for authentication failures.
 */
export class AuthenticationError extends Error {
    public statusCode: number;

    constructor(message: string = 'Authentication failed') {
        super(message);
        this.name = 'AuthenticationError';
        this.statusCode = 401;
    }
}
