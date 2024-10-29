import * as taskController from "../controller/task.controller";

import { Router } from "express";
import { validateDTO } from "../middleware/validation.middleware";
import { CreateTaskDTO, UpdateTaskDTO, UserIdDTO } from "../dto/task";

const router = Router();

router.route("/").post(validateDTO({ body: CreateTaskDTO }), taskController.createTask);
router.route("/:id").patch(validateDTO({ body: UpdateTaskDTO, params: UserIdDTO }), taskController.updateTask);
router.route("/").get(taskController.fetchAllTask);
router.route("/:id").delete(validateDTO({ params: UserIdDTO }), taskController.deleteTask);

export default router;
