import express, { Request, Response, NextFunction, Express } from "express";
import morgan from "morgan";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import { AuthenticationError } from "./errors/AuthenticationError";
import { AuthorizationError } from "./errors/AuthorizationError";

const app: Express = express();

// Morgan logging middleware
app.use(morgan('combined'));

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

/**
 * Global error handler.
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof AuthenticationError) {
        res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof AuthorizationError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default app;
