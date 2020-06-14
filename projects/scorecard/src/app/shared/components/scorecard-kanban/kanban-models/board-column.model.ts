import { Task } from '../../../models/task.model';

export class BoardColumn {
  constructor(public name: string, public tasks: Task[]){}
}
