import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
// my imports
import { TaskDTO, UpdateTaskDto } from './dto/task.dto';
import { ITask } from './interfaces/task.interface';
import { TaskService } from './task.service';

@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  store(@Body() taskDTO: TaskDTO, @Res() res: Response) {
    const data = this.taskService.create(taskDTO);
    return res.json(data);
  }

  @Get()
  index(@Res() res: Response): Response<ITask[]> {
    const data = this.taskService.all();
    return res.json(data);
  }

  @Get(':id') //isObjectId
  show(@Param('id') id: string, @Res() res: Response): Response<ITask> {
    const data = this.taskService.findById(id);
    return res.json(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() taskToUpdate: UpdateTaskDto,
    @Res() res: Response,
  ): Response<ITask> {
    const updatedTask = this.taskService.findByIdAndUpdate(id, taskToUpdate);
    return res.json(updatedTask);
  }

  @Delete(':id')
  destroy(@Param('id') id: string, @Res() res: Response): Response<string> {
    const messageResponse = this.taskService.destroyById(id);
    return res.json({ message: messageResponse });
  }
}
