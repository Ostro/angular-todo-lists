import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Patch,
  } from '@nestjs/common';
  import { TodosService } from './todos.service';
  import { Todo, Prisma } from '@prisma/client';
  
  @Controller()
  export class TodoController {
    constructor(
      private readonly todosService: TodosService,
    ) {}
  
    @Get('todos')
    async getTodos() {
      return this.todosService.getTodos();
    }

    @Get('todo/:id')
    async getTodoById(@Param('id') id: string) {
      return this.todosService.getTodo(Number(id));
    }
  
    @Post('todo')
    async createTodo(
      @Body() todoData: Prisma.TodoCreateInput ,
    ) {
      return this.todosService.createTodo(todoData);
    }
  
    @Patch('todo/:id')
    async patchTodo(@Param('id') id: string,  @Body() todoData: Prisma.TodoUpdateInput) {
      return this.todosService.patchTodo( Number(id), todoData);
    }
  
    @Delete('todo/:id')
    async deletePost(@Param('id') id: string) {
      return this.todosService.deleteTodo(Number(id));
    }
  }