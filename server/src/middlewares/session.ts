import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '../../prisma/generated/client';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';
import { RedisService } from 'src/redis.service';

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'password'>;
    }
  }
}

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(
    private redisService: RedisService,
    private prisma: PrismaService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const jwt = req.headers.authorization?.split('Bearer ')[1];
    if (jwt) {
      const userInfos = await this.redisService.client.get(jwt);
      const jwtUser = JSON.parse(userInfos);

      const user = await this.prisma.user.findUnique({
        where: { id: jwtUser.id },
        omit: {
          password: true,
        },
      });

      if (user) req.user = user;
    }
    next();
  }
}
