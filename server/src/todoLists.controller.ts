import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Prisma } from '@prisma/client';
import { TodoListsService } from './todoLists.service';

@Controller()
export class TodoListController {
  constructor(private readonly todoListsService: TodoListsService) {}

  @Get('todoLists')
  async getTodos() {
    return this.todoListsService.getTodoLists();
  }

  @Get('todoList/:id')
  async getTodoById(@Param('id') id: string) {
    return this.todoListsService.getTodoList(Number(id));
  }

  @Post('todoList')
  async createTodo(@Body() todoData: Prisma.TodoListCreateInput) {
    return this.todoListsService.createTodoList(todoData);
  }

  @Patch('todoList/:id')
  async patchTodo(@Param('id') id: string, @Body() title: string) {
    return this.todoListsService.patchTodoList(Number(id), title);
  }

  @Delete('todoList/:id')
  async deletePost(@Param('id') id: string) {
    return this.todoListsService.deleteTodoList(Number(id));
  }
}
