import express from "express";

const app = express();

app.use(express.json());

import authRouter from "./routes/auth.route";
import accRouter from "./routes/account.route";

app.use("/api/v1/user", authRouter);
app.use("/api/v1/user", accRouter);

export { app };
