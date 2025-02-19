import { Request, Response } from "express";
import { AppError, BadRequestError } from "../utils/error.handler";
import * as taskService from "../service/task.service";

async function createTask(req: Request, res: Response) {
  try {
    const result = await taskService.createTask(req.body);
    return res.status(201).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server error" });
  }
}

async function updateTask(req: Request, res: Response) {
  try {
    if (typeof req.params.id !== "number") throw new BadRequestError("Invalid ID data type");
    const result = await taskService.updateTask(req.body, req.params.id);
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server error" });
  }
}

async function fetchAllTask(req: Request, res: Response) {
  try {
    const result = await taskService.fetchAllTask();
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server error" });
  }
}

async function deleteTask(req: Request, res: Response) {
  try {
    if (typeof req.params.id !== "number") throw new BadRequestError("Invalid ID data type");
    const result = await taskService.deleteTask(req.params.id);
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server error" });
  }
}

export { createTask, updateTask, fetchAllTask, deleteTask };
