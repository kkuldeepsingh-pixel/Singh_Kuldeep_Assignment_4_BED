import express from "express";
import morgan from "morgan";
import loanRoutes from "./api/v1/routes/loanRoutes";
import { errorHandler } from "./api/v1/middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(errorHandler);
app.use("/api/v1", loanRoutes);

app.get("/health", (req, res) => {
 res.json({ status: "ok" });
});

export default app;