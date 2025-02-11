import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  getTodo(id: number) {
    return this.prisma.todo.findUnique({
      where: {
        id,
      },
    });
  }

  getTodos(listId: number) {
    return this.prisma.todo.findMany({
      where: {
        TodoList: { id: listId },
      },
    });
  }

  async createTodo(listId: number, todo: Prisma.TodoCreateInput) {
    return this.prisma.todo.create({
      data: {
        description: todo.description,
        TodoList: {
          connect: {
            id: listId,
          },
        },
      },
    });
  }

  patchTodo(id: number, todoData: Prisma.TodoUpdateInput) {
    console.log(id, todoData);
    return this.prisma.todo.update({
      where: { id },
      data: todoData,
    });
  }

  deleteTodo(id: number) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
