import { Injectable } from '@nestjs/common';
import { TaskDTO, UpdateTaskDto } from './dto/task.dto';
import { ITask } from './interfaces/task.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  tasks: ITask[] = [];

  create(taskDTO: TaskDTO): ITask {
    const task: ITask = {
      id: uuidv4(),
      description: taskDTO.description,
      isDone: taskDTO.isDone,
    };

    this.tasks.push(task);
    return task;
  }

  all(): ITask[] {
    return this.tasks;
  }

  findById(id: string): ITask {
    const data = this.tasks.find((task) => task.id === id);
    return data;
  }

  findByIdAndUpdate(id: string, taskDTO: UpdateTaskDto): ITask {
    const newTask: ITask = {
      id,
      description: taskDTO.description,
      isDone: taskDTO.isDone,
    };

    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));
    return newTask;
  }

  destroyById(id: string): string {
    const messageResponse = 'Deleted Task';
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return messageResponse;
  }
}
