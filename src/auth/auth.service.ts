import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

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
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.nickname, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
