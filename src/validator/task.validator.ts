import { body, param } from "express-validator";

const createTaskValidator = [
  body("task")
    .notEmpty()
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("The task should be an alphanumeric value with spaces in between."),
  body("status").notEmpty().isIn(["Completed", "Pending"]).withMessage("Status should be Completed or Pending"),
];

const updateTaskValidator = [
  body("task")
    .optional()
    .notEmpty()
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("The task should be an alphanumeric value with spaces in between."),
  body("status")
    .optional()
    .notEmpty()
    .isIn(["Completed", "Pending"])
    .withMessage("Status should be Completed or Pending"),
];

const taskIdValidator = [param("id").notEmpty().isInt({ min: 1 }).withMessage("Require a valid id").toInt()];

export { createTaskValidator, updateTaskValidator, taskIdValidator };
