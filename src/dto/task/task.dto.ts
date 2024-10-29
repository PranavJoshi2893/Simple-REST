import { Status } from "@prisma/client";
import { Expose, Type } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPositive, Matches, Min } from "class-validator";

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

export class UpdateTaskDTO {
  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\s]+$/, { message: "The task should be an alphanumeric value with spaces in between." })
  task!: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(["Completed", "Pending"], { message: "Status should be Completed or Pending" })
  status!: Status;
}

export class UserIdDTO {
  @Expose()
  @IsNumberString()
  id!: number;
}
