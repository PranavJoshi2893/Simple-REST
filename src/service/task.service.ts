import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CreateTaskDTO } from "../dto/task";
import prisma from "../model/prisma.config";
import { BadRequestError, NotFoundError } from "../utils/error.handler";

async function createTask(taskDetails: CreateTaskDTO) {
  try {
    const { task, status } = taskDetails;
    await prisma.task.create({
      data: { task, status },
    });

    return { message: "New task added" };
  } catch (e) {
    throw new BadRequestError("Something bad happened during creating task");
  }
}

async function updateTask(taskDetails: any, tid: number) {
  try {
    await prisma.task.update({
      where: { tid },
      data: {
        task: taskDetails?.task || undefined,
        status: taskDetails?.status || undefined,
      },
    });

    return { message: "Task detail's updated" };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") throw new NotFoundError("Record to update not found.");
    }
    throw new BadRequestError("Something bad happened during updating task");
  }
}

async function fetchAllTask() {
  try {
    const tasks = await prisma.task.findMany({
      select: {
        tid: true,
        task: true,
        status: true,
      },
    });

    return { tasks };
  } catch (e) {
    throw new BadRequestError("Something bad happened during updating task");
  }
}

async function deleteTask(tid: number) {
  try {
    await prisma.task.delete({
      where: { tid },
    });

    return { message: "Task deleted" };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") throw new NotFoundError("Record to delete does not exist.");
    }
    throw new BadRequestError("Something bad happened during updating task");
  }
}

export { createTask, updateTask, fetchAllTask, deleteTask };
