import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoListController } from './todoLists.controller';
import { PrismaService } from './prisma.service';
import { TodoController } from './todos.controller';
import { LoginController } from './login/login.controller';
import { RedisService } from './redis.service';
import { SessionMiddleware } from './middlewares/session';

@Module({
  imports: [],
  controllers: [TodoController, TodoListController, LoginController],
  providers: [PrismaService, RedisService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
