import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { Prisma } from '../prisma/generated/client';
import { PrismaService } from './prisma.service';

@Controller()
export class TodoController {
  constructor(private prisma: PrismaService) {}

  @Get('todos/:listId')
  async getTodos(@Param('listId') listId: string) {
    return this.prisma.todo.findMany({
      where: {
        TodoList: { id: Number(listId) },
      },
    });
  }

  @Get('todo/:id')
  async getTodoById(@Param('id') id: string) {
    return this.prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  @Post('todo/:listId')
  async createTodo(
    @Body() todo: Prisma.TodoCreateInput,
    @Param('listId') listId: string,
  ) {
    return this.prisma.todo.create({
      data: {
        description: todo.description,
        TodoList: {
          connect: {
            id: Number(listId),
          },
        },
      },
    });
  }

  @Put('todo/:id')
  async patchTodo(
    @Param('id') id: string,
    @Body() todo: Prisma.TodoUpdateInput,
  ) {
    return this.prisma.todo.update({
      where: { id: Number(id) },
      data: todo,
    });
  }

  @Delete('todo/:id')
  async deletePost(@Param('id') id: string) {
    return this.prisma.todo.delete({
      where: { id: Number(id) },
    });
  }
}
