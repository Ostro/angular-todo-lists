import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import _ from 'lodash';
import JWT from 'jsonwebtoken';

type Credentials = {
  email: string;
  password: string;
};

const JWT_SECRET = 'shhhhh';

@Controller('login')
export class LoginController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async login(@Body() credentials: Credentials) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: credentials.email,
      },
    });

    const isPasswordValid = await compare(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return { jwt: JWT.sign(_.omit(user, 'password'), JWT_SECRET) };
  }
}
