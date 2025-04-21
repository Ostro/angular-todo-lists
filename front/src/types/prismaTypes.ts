import { Prisma } from '../../../server/prisma/generated/client';
export * from '../../../server/prisma/generated/client';

export type Todo = Prisma.TodoGetPayload<{
  include: { createdBy: true };
}>;

export type TodoList = Prisma.TodoListGetPayload<{
  include: { createdBy: true };
}>;
