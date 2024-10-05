import { HttpException, Injectable } from '@nestjs/common';
import { IGetUser } from './interface/get-user-interface';
import { IPostUser } from './interface/post-user-interface';
import usersStorage from 'src/userStorage';
import { IPatchUser } from './interface/patch-user-interface';
import { IDeleteUser } from './interface/delete-user-interface';

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

  createUser(postUser: IPostUser): IGetUser {
    const user: IGetUser | undefined = usersStorage.addUser(postUser);
    if (!user) {
      throw new HttpException('User already exists', 409);
    }
    return user;
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

  findByName(userName: string): IGetUser | undefined {
    return usersStorage.findByName(userName);
  }
}
