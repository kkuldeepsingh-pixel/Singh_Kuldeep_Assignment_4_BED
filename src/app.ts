import express from "express";
import morgan from "morgan";
import loanRoutes from "./api/v1/routes/loanRoutes";
import { errorHandler } from "./api/v1/middleware/errorHandler";
import path from "path";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(errorHandler);
app.use("/api/v1", loanRoutes);

app.get("/health", (req, res) => {
 res.json({ status: "ok" });
});

const logDirectory = path.join(__dirname, "logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

export default app;