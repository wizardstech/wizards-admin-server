import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { flatten, uniq } from 'lodash';

import { UserService } from '@/modules/user/user.service';
import { User } from '@/entities/user.entity';
import { JWTPayload } from './models/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ username }, { relations: ['roles', 'roles.permissions'] });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload: JWTPayload = {
      username: user.username,
      sub: user.id,
      permissions: uniq(flatten(user.roles.map(role => role.permissions.map(permission => permission.name)))),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
