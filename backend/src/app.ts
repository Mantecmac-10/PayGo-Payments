import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

import authRouter from "./routes/auth.route";
import accRouter from "./routes/account.route";

app.use("/api/v1/user", authRouter);
app.use("/api/v1/user", accRouter);

export { app };
