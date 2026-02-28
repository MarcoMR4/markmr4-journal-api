import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../user/user.service';
import { RoleName } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException({
        errorCode: 'AUTH_USER_NOT_FOUND',
        errorMessage: 'User not found',
      });
    }

    const passwordMatches = await bcrypt.compare(pass, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException({
        errorCode: 'AUTH_INVALID_PASSWORD',
        errorMessage: 'Invalid password',
      });
    }

    const userRoles: RoleName[] = user.roles.map((ur) => ur.role.name);

    const payload = {
      username: user.nickname,
      sub: user.id,
      roles: userRoles,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
