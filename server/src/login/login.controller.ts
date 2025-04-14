import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import _ from 'lodash';
import JWT from 'jsonwebtoken';
import { RedisService } from 'src/redis.service';
import { Response } from 'express';

type Credentials = {
  email: string;
  password: string;
};

const JWT_SECRET = 'shhhhh';

@Controller('login')
export class LoginController {
  constructor(private prisma: PrismaService, private redis: RedisService) {}

  @Post()
  async login(
    @Body() credentials: Credentials,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: credentials.email,
      },
    });

    const isPasswordValid = await compare(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const session = _.omit(user, 'password');
    const jwt = JWT.sign(session, JWT_SECRET);

    await this.redis.client.set(jwt, JSON.stringify(session), {
      EX: 60 * 60 * 24, // 1 day
    });

    res.cookie('user-session', jwt);

    return _.omit(session, 'password');
  }
}
