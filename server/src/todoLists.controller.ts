import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '../prisma/generated/client';
import { PrismaService } from './prisma.service';
import { Request } from 'express';
import { IsAuthenticated } from './guards/isAuthenticated';

@Controller()
export class TodoListController {
  constructor(private prisma: PrismaService) {}

  @Get('todoLists')
  @UseGuards(IsAuthenticated)
  async getTodos(@Req() request: Request) {
    const lists = await this.prisma.todoList.findMany({
      where: { userId: request.user.id },
    });

    return lists.map((list) => {
      return {
        id: list.id,
        title: list.title,
      };
    });
  }

  @Get('todoList/:id')
  async getTodoById(@Param('id') id: string) {
    return this.prisma.todoList.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  @Post('todoList')
  @UseGuards(IsAuthenticated)
  async createTodo(
    @Req() request: Request,
    @Body() todoData: Prisma.TodoListCreateInput,
  ) {
    return this.prisma.todoList.create({
      data: {
        ...todoData,
        User: {
          connect: {
            id: request.user.id,
          },
        },
      },
    });
  }

  @Patch('todoList/:id')
  async patchTodo(@Param('id') id: string, @Body() title: string) {
    return this.prisma.todoList.update({
      where: { id: Number(id) },
      data: { title },
    });
  }

  @Delete('todoList/:id')
  async deletePost(@Param('id') id: string) {
    return this.prisma.todoList.delete({
      where: { id: Number(id) },
    });
  }
}
