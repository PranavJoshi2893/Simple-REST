import { Status } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty, Matches } from "class-validator";

export class CreateTaskDTO {
  @Expose()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\s]+$/, { message: "The task should be an alphanumeric value with spaces in between." })
  task!: string;

  @Expose()
  @IsNotEmpty()
  @IsEnum(["Completed", "Pending"], { message: "Status should be Completed or Pending" })
  status!: Status;
}
