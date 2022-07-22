import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class TaskDTO {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  isDone: boolean;
}

export class UpdateTaskDto extends PartialType(TaskDTO) {}
