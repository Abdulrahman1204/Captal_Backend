import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./configs/connectToDb";
import { errorHandler, notFound } from "./middlewares/error";
import UserRoute from './routes/users/user.routes'
import RehabilitationsRoute from './routes/rehabilitations/rehabilitations.routes'

// .env
dotenv.config();

// Validate required environment variables
["MONGO_URL", "JWT_SECRET_KEY", "NODE_ENV", "PORT"].forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Missing required environment variable: ${env}`);
  }
});

// Connection To Db
connectDB();

// Init App
const app: Application = express();

// middleware
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// Cors Policy
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("API is running in BOOKS_GPT");
});
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
app.use('/api/user', UserRoute)
app.use('/api/rehabilitations', RehabilitationsRoute)

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);


// Running The Server
const PORT: number = parseInt(process.env.PORT || "9000");
app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
