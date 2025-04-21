import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Prisma } from '../prisma/generated/client';
import { PrismaService } from './prisma.service';
import { IsAuthenticated } from './guards/isAuthenticated';
import { Request } from 'express';

@Controller()
export class TodoController {
  constructor(private prisma: PrismaService) {}

  @Get('todos/:listId')
  async getTodos(@Param('listId') listId: string) {
    return this.prisma.todo.findMany({
      where: {
        TodoList: { id: Number(listId) },
      },
      include: {
        createdBy: true,
      },
    });
  }

  @Post('todo/:listId')
  @UseGuards(IsAuthenticated)
  async createTodo(
    @Req() request: Request,
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
        createdBy: {
          connect: {
            id: request.user.id,
          },
        },
      },
      include: {
        createdBy: true,
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
