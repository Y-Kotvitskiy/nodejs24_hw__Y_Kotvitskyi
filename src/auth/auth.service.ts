import { Injectable, UnauthorizedException } from '@nestjs/common';
import { usersStorage } from 'src/userStorage';
import { IAuthUser } from './interface/auth-user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async signIn(username: string, password: string): Promise<number> {
    const user: IAuthUser = <IAuthUser>usersStorage.findByName(username);
    console.log(`user`, user);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(
      password,
      usersStorage.getPassword(user),
    );
    if (!isMatch) throw new UnauthorizedException();
    //    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return user.id;
  }
}
