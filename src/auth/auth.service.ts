import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { usersStorage, setUserHash } from 'src/userStorage';
import { IAuthUser } from './interface/auth-user';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ISingUpUser } from './interface/singup-user';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signUp(singUpUser: ISingUpUser): Promise<{ access_token: string }> {
    const userId = usersStorage.createUser(singUpUser);
    if (!userId) {
      throw new BadRequestException(
        `User with firstName: ${singUpUser.firstName} already exists`,
      );
    }
    await setUserHash(userId);
    const payload = { id: userId, username: usersStorage.getFullName(userId) };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user: IAuthUser = <IAuthUser>usersStorage.findByName(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    user.username = username;
    const isMatch = await bcrypt.compare(
      password,
      usersStorage.getPassword(user),
    );
    if (!isMatch) throw new UnauthorizedException();

    const payload = { id: user.id, username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  logout(userId: number): number {
    if (!usersStorage.setLogout(userId)) throw new UnauthorizedException();
    return userId;
  }

  async refreshTokens(user: IAuthUser) {
    const payload = { id: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
