import { HttpException, Injectable } from '@nestjs/common';
import { IGetUser } from './interface/get-user-interface';
import { IPostUser } from './interface/post-user-interface';
import { IPatchUser } from './interface/patch-user-interface';
import { IDeleteUser } from './interface/delete-user-interface';
import usersStorage, { setUserHash } from 'src/userStorage';
import { ICreateUser } from './interface/create-user-interface';
import { ISingUpUser } from './interface/singup-user.-interface';

@Injectable()
export class UsersService {
  getUsers(): IGetUser[] {
    return usersStorage.getUsers();
  }

  getUser(userId: number): IGetUser {
    const user: IGetUser | false = usersStorage.getUserById(userId);
    if (!user) {
      throw new HttpException('Not found', 404);
    }
    return user;
  }

  addUser(postUser: IPostUser): IGetUser {
    const user: IGetUser | undefined = usersStorage.addUser(postUser);
    if (!user) {
      throw new HttpException('User already exists', 409);
    }
    return user;
  }

  async createUser(singUpUser: ISingUpUser): Promise<ICreateUser | undefined> {
    const createdUser: ICreateUser = await usersStorage.createUser(singUpUser);
    if (!createdUser) {
      return undefined;
    }
    return createdUser;
  }

  updateUser(id: number, putUser: IPostUser): IGetUser {
    const user: IGetUser | undefined = usersStorage.updateUserById(id, putUser);
    if (!user) {
      throw new HttpException('Not found', 404);
    }
    return user;
  }

  modifyUser(id: number, putUser: IPatchUser): IGetUser {
    const user: IGetUser | undefined = usersStorage.modifyUserById(id, putUser);
    if (!user) {
      throw new HttpException('Not found', 404);
    }
    return user;
  }

  deleteUser(userId: number): IDeleteUser {
    const deletedUser: IDeleteUser | undefined =
      usersStorage.deleteUserById(userId);
    if (!deletedUser) {
      throw new HttpException('Not found', 404);
    }
    return deletedUser;
  }

  findByName(userName: string): ICreateUser | undefined {
    return usersStorage.findByName(userName);
  }

  async comparePassword(userId: number, password: string): Promise<boolean> {
    return usersStorage.comparePassword(userId, password);
  }

  setLogout(userId: number): number {
    return usersStorage.setLogout(userId);
  }

  isExpired(id: number, iat: number) {
    return usersStorage.isExpired(id, iat);
  }
}
