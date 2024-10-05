import { Injectable, UnauthorizedException } from '@nestjs/common';
import { usersStorage } from 'src/userStorage';
import { IAuthUser } from './interface/auth-user';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user: IAuthUser = <IAuthUser>usersStorage.findByName(username);
    if (!user) {
      throw new UnauthorizedException();
    }
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
}
