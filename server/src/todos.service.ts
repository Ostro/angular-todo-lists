import { Controller, Get } from '@nestjs/common';
import {PrismaService} from "./prisma.service"
import { Todo, Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  getTodo(id: number) {
    return this.prisma.todo.findUnique({
    where: {
      id
    }
    })
  }

  getTodos() {
    return this.prisma.todo.findMany()
  }

  createTodo(todo: Prisma.TodoCreateInput) {
    return this.prisma.todo.create({
      data: todo
    })
  }

  patchTodo(id: number, todoData: Prisma.TodoUpdateInput) {
    return this.prisma.todo.update({
      where: {id},
      data: todoData
    })
  }

  deleteTodo(id: number) {
    return this.prisma.todo.delete({
      where: {id}
    })
  }
}