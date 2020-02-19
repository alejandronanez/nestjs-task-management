import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    const updateTaskDTO = {
      id,
      status,
    };
    return this.taskService.updateTaskStatus(updateTaskDTO);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO);
  }
}
