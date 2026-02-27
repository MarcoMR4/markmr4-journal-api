import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleName } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleName[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException({
        errorCode: 'AUTH_USER_NOT_FOUND',
        message: 'User not authenticated',
      });
    }

    if (!user.roles || user.roles.length === 0) {
      throw new ForbiddenException({
        errorCode: 'AUTH_NO_ROLES',
        message: 'User has no roles assigned',
      });
    }

    const hasRole = requiredRoles.some((role) => user.roles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException({
        errorCode: 'AUTH_INSUFFICIENT_PERMISSIONS',
        message: `Requires one of the following roles: ${requiredRoles.join(', ')}`,
      });
    }

    return true;
  }
}
