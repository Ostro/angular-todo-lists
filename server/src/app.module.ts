import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { PrismaService } from './prisma.service'
import {TodoController} from './todos.controller'

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [PrismaService, TodosService],
})
export class AppModule {}
