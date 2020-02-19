import { TaskStatus } from '../task.model';

export class UpdateTaskDTO {
  id: string;
  status: TaskStatus;
}
