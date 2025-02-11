import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoListsService {
  constructor(private prisma: PrismaService) {}

  getTodoList(id: number) {
    return this.prisma.todoList.findUnique({
      where: {
        id,
      },
    });
  }

  async getTodoLists() {
    const lists = await this.prisma.todoList.findMany();
    return lists.map((list) => {
      return {
        id: list.id,
        title: list.title,
      };
    });
  }

  async createTodoList(todoList: Prisma.TodoListCreateInput) {
    const user = await this.prisma.user.findFirst();

    return this.prisma.todoList.create({
      data: {
        ...todoList,
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  patchTodoList(id: number, title: string) {
    return this.prisma.todoList.update({
      where: { id },
      data: { title },
    });
  }

  deleteTodoList(id: number) {
    return this.prisma.todoList.delete({
      where: { id },
    });
  }
}
