import { CanActivate, ExecutionContext } from '@nestjs/common';

export class IsAuthenticated implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return !!request.user;
  }
}
