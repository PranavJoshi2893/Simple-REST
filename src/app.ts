import express from "express";
import taskRoute from "./route/task.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/task", taskRoute);

export default app;
