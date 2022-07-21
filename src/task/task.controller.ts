import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TaskDTO } from './dto/task.dto';
import { ITask } from './interfaces/task.interface';
import { TaskService } from './task.service';

@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  store(@Body() taskDTO: TaskDTO, @Res() res: Response): Response<ITask> {
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
  update(@Req() req: Request, @Res() res: Response): Response<ITask> {
    const taskId = req.params.id;
    const taskToUpdate = req.body;

    const updatedTask = this.taskService.findByIdAndUpdate(
      taskId,
      taskToUpdate,
    );

    return res.json(updatedTask);
  }

  @Delete(':id')
  destroy(@Param('id') id: string, @Res() res: Response): Response<string> {
    const messageResponse = this.taskService.destroyById(id);
    return res.json({ message: messageResponse });
  }
}
