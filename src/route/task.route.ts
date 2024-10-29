import * as taskController from "../controller/task.controller";

import { Router } from "express";
import { createTaskValidator, updateTaskValidator, taskIdValidator } from "../validator/task.validator";
import validate from "../middleware/validator.middleware";

const router = Router();

router.route("/").post(createTaskValidator, validate, taskController.createTask);
router.route("/:id").patch(updateTaskValidator, taskIdValidator, validate, taskController.updateTask);
router.route("/").get(taskController.fetchAllTask);
router.route("/:id").delete(taskIdValidator, validate, taskController.deleteTask);

export default router;
