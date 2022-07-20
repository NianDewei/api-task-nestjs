import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { TaskService } from './task.service';

@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  store(@Req() req: Request, @Res() res: Response) {
    const data = {
      name: req.body.name,
      method: `${req.method}`,
    };

    return res.json(data);
  }

  @Get()
  index(@Req() req: Request, @Res() res: Response) {
    const data = {
      name: 'Nian Dewei',
      method: `${req.method}`,
    };

    return res.json(data);
  }

  @Get(':id')
  show(@Req() req: Request) {
    const data = {
      _id: req.params.id,
      method: `${req.method}`,
    };

    return data;
  }

  @Put(':id')
  update(@Req() req: Request, @Res() res: Response) {
    const data = {
      _id: req.params.id,
      method: `${req.method}`,
    };

    return res.status(200).json(data);
  }

  @Delete(':id')
  destroy(@Req() req: Request, @Res() res: Response) {
    const data = {
      _id: req.params.id,
      method: `${req.method}`,
    };

    return res.status(200).json(data);
  }
}
