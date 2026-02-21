import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException({
        errorCode: 'AUTH_MISSING_HEADER',
        message: 'Authorization header is missing',
      });
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        errorCode: 'AUTH_BAD_FORMAT_HEADER',
        message: 'Invalid authorization format. Expected: Bearer <token>',
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch (e: any) {
      const isExpired =
        e?.name === 'TokenExpiredError' || e?.message?.includes('expired');

      throw new UnauthorizedException({
        errorCode: isExpired ? 'AUTH_TOKEN_EXPIRED' : 'AUTH_INVALID_TOKEN',
        message: isExpired ? 'Authentication token expired' : 'Invalid token',
      });
    }
    return true;
  }
}
