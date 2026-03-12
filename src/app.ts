import express from "express";
import morgan from "morgan";
import path from "path";
import fs from "fs";

import loanRoutes from "./api/v1/routes/loanRoutes";
import authRoutes from "./api/v1/routes/authRoutes";
import { errorHandler } from "./api/v1/middleware/errorHandler";

const app = express();

//Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logging middleware
const logDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev")); 

//  Health check 
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/loans", loanRoutes);

// Global error handler
app.use(errorHandler);

export default app;