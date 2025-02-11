import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Prisma } from '@prisma/client';

@Controller()
export class TodoController {
  constructor(private readonly todosService: TodosService) {}

  @Get('todos/:listId')
  async getTodos(@Param('listId') listId: string) {
    return this.todosService.getTodos(Number(listId));
  }

  @Get('todo/:id')
  async getTodoById(@Param('id') id: string) {
    return this.todosService.getTodo(Number(id));
  }

  @Post('todo/:listId')
  async createTodo(
    @Body() todoData: Prisma.TodoCreateInput,
    @Param('listId') listId: string,
  ) {
    return this.todosService.createTodo(Number(listId), todoData);
  }

  @Put('todo/:id')
  async patchTodo(
    @Param('id') id: string,
    @Body() todoData: Prisma.TodoUpdateInput,
  ) {
    return this.todosService.patchTodo(Number(id), todoData);
  }

  @Delete('todo/:id')
  async deletePost(@Param('id') id: string) {
    return this.todosService.deleteTodo(Number(id));
  }
}
