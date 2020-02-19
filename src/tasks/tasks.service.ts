import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTaskStatus(updateTaskDTO: UpdateTaskDTO): Task {
    const { id, status } = updateTaskDTO;
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }
}
