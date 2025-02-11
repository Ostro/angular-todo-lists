import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoListsService } from './todoLists.service';
import { TodoListController } from './todoLists.controller';
import { PrismaService } from './prisma.service';
import { TodoController } from './todos.controller';

@Module({
  imports: [],
  controllers: [TodoController, TodoListController],
  providers: [PrismaService, TodosService, TodoListsService],
})
export class AppModule {}
