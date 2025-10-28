import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRoutes from "./routes/health.route.js";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";
import webhookRoutes from "./routes/webhook.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/webhook", webhookRoutes);

export default app;
