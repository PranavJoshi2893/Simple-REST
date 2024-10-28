import * as taskController from "../controller/task.controller";

import { Router } from "express";

const router = Router();

router.route("/").post(taskController.createTask);
router.route("/:id").patch(taskController.updateTask);
router.route("/").get(taskController.fetchAllTask);
router.route("/:id").delete(taskController.deleteTask);

export default router;
