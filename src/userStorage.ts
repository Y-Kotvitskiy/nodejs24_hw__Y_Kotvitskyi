import { IGetUser } from './users/interface/get-user-interface';
import { IPostUser } from './users/interface/post-user-interface';
import { IPatchUser } from './users/interface/patch-user-interface';
import { IDeleteUser } from './users/interface/delete-user-interface';
import * as bcrypt from 'bcrypt';

interface UsersTable {
  [key: number]: IGetUser;
  passwd: { [key: number]: string };
}

export class UserStorage {
  private maxId: number = 0;

  constructor(private usersTable: UsersTable) {
    for (const key in usersTable) {
      this.maxId = Math.max(this.maxId, usersTable[key].id);
    }
  }

  public getUsers(): IGetUser[] {
    const users: IGetUser[] = [];
    return Object.keys(this.usersTable).map((key) => this.usersTable[key]);
  }

  public getPassword(user: IGetUser): string | undefined {
    return this.usersTable.passwd[user.id];
  }

  public addUser(user: IPostUser): IGetUser | undefined {
    const newUser = this.clearName(user);
    if (
      Object.keys(this.usersTable).some(
        (key) =>
          this.usersTable[key].firstName === user.firstName &&
          this.usersTable[key].lastName === user.lastName,
      )
    ) {
      return undefined;
    }
    const getUser = <IGetUser>user;
    this.maxId++;
    getUser.id = this.maxId;
    this.usersTable[this.maxId] = getUser;
    return getUser;
  }

  private getFullName(userId: number): string | undefined {
    const user: IGetUser | undefined = this.usersTable[userId];
    if (user) {
      return `${user.firstName}_${user.lastName}`;
    }
    return undefined;
  }

  public findByName(userName: string): IGetUser | undefined {
    for (const userId in this.usersTable) {
      if (this.getFullName(Number(userId)) === userName)
        return this.usersTable[userId];
    }
    return undefined;
  }

  public getUserById(id: number): IGetUser | undefined {
    return this.usersTable[id];
  }

  public updateUserById(id: number, putUser: IPostUser): IGetUser | undefined {
    const user = this.usersTable[id];
    if (!user) {
      return undefined;
    }
    this.usersTable[id] = { ...putUser, id: id };
    return this.usersTable[id];
  }

  public modifyUserById(id: number, putUser: IPatchUser): IGetUser | undefined {
    const user = this.usersTable[id];
    if (!user) {
      return undefined;
    }
    for (const key in putUser) {
      user[key] = putUser[key];
    }
    return this.usersTable[id];
  }

  public deleteUserById(id: number): IDeleteUser | undefined {
    const user = this.usersTable[id];
    if (!user) {
      return undefined;
    }
    delete this.usersTable[id];
    return { id };
  }

  private clearName(user: IPostUser): IPostUser {
    return {
      ...user,
      firstName: user.firstName.trim(),
      lastName: user.lastName.trim(),
    };
  }
}

const users: UsersTable = {
  1: {
    id: 1,
    firstName: 'Joe',
    lastName: 'Doe',
    age: 30,
    isStudent: false,
  },
  2: {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    age: 27,
    isStudent: true,
  },
  3: {
    id: 3,
    firstName: 'Make',
    lastName: 'Doe',
    age: 27,
    isStudent: true,
  },
  passwd: {
    1: '123456',
    2: '123456',
    3: '123456',
  },
};

const usersStorage = new UserStorage(users);

export default usersStorage;
export { users, usersStorage };
