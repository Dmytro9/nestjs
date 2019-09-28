import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreaTetaskDto } from './dto/create-task.dto';
import { GetTetaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTetaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter(t => t.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(t =>
  //       t.title.includes(search) ||
  //       t.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find(t => t.id === id);

  //   if (!found) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }

  //   return found;
  // }

  // createTask(createTaskDto: CreaTetaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(t => t.id !== found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

}
