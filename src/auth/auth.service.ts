import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthUser } from './interface/auth-user-interface.ts';
import { JwtService } from '@nestjs/jwt';
import { ISingUpUser } from './interface/singup-user';
import { ICreateUser } from './interface/create-user-interface.js';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(singUpUser: ISingUpUser): Promise<{ access_token: string }> {
    const createdUser = await this.usersService.createUser(singUpUser);
    if (!createdUser) {
      throw new BadRequestException(
        `User with firstName: ${singUpUser.firstName} already exists`,
      );
    }
    const payload = { id: createdUser.id, username: createdUser.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user: ICreateUser = this.usersService.findByName(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    user.username = username;
    if (!this.usersService.comparePassword(user.id, password))
      throw new UnauthorizedException();

    const payload = { id: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  logout(userId: number): number {
    if (!this.usersService.setLogout(userId)) throw new UnauthorizedException();
    return userId;
  }

  async refreshTokens(user: IAuthUser) {
    const payload = { id: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
