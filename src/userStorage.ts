import { IGetUser } from './users/interface/get-user-interface';
import { IPostUser } from './users/interface/post-user-interface';
import { IPatchUser } from './users/interface/patch-user-interface';
import { IDeleteUser } from './users/interface/delete-user-interface';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from './constans';
import { ICreateUser } from './users/interface/create-user-interface';
import { ISingUpUser } from './users/interface/singup-user.-interface';

type Exp = number;

interface UsersTable {
  [key: number]: IGetUser;
  passwd: { [key: number]: string };
  logout: { [key: number]: Exp };
}

export class UserStorage {
  private maxId: number = 0;

  constructor(private usersTable: UsersTable) {
    for (const key in usersTable) {
      if (Number(key)) this.maxId = Math.max(this.maxId, usersTable[key].id);
    }
  }

  public getUsers(): IGetUser[] {
    const users: IGetUser[] = [];
    return Object.keys(this.usersTable).map((key) => this.usersTable[key]);
  }

  public getPassword(userId: number): string | undefined {
    return this.usersTable.passwd[userId];
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

  public createUser(singUpUser: ISingUpUser): ICreateUser | undefined {
    const newUser: IGetUser = this.addUser({
      ...singUpUser,
      age: 0,
      isStudent: false,
    });
    if (newUser) {
      this.usersTable.passwd[newUser.id] = singUpUser.password;
    }
    return newUser
      ? { id: newUser.id, username: this.getFullName(newUser.id) }
      : undefined;
  }

  public findByName(userName: string): ICreateUser | undefined {
    for (const userId in this.usersTable) {
      if (this.getFullName(Number(userId)) === userName)
        return { id: Number(userId), username: userName };
    }
    return undefined;
  }

  public setPasword(userId: number, userPassword: string) {
    this.usersTable.passwd[userId] = userPassword;
  }

  public getFullName(userId: number): string | undefined {
    const user: IGetUser | undefined = this.usersTable[userId];
    if (user) {
      return `${user.firstName}_${user.lastName}`;
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

  public setLogout(id: number): number | undefined {
    if (this.usersTable[id]) {
      this.usersTable.logout[id] = Math.floor(Date.now() / 1000);
      return id;
    }
    return undefined;
  }

  public isExpired(id: number, exp: Exp): boolean {
    if (this.usersTable[id]) {
      return this.usersTable.logout[id] > exp;
    }
    return false;
  }

  public clearLogout(id: number): number | undefined {
    if (this.usersTable[id]) {
      delete this.usersTable.logout[id];
      return id;
    }
    return undefined;
  }

  public async comparePassword(
    userId: number,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, this.getPassword(userId));
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
  logout: {},
};

const hashUserPasswords = async () => {
  for (const userId in users) {
    const id: number = Number(userId);
    if (id) await setUserHash(id);
  }
};

const setUserHash = async (userId: number) =>
  (users.passwd[userId] = await bcrypt.hash(
    users.passwd[userId],
    saltOrRounds,
  ));

const usersStorage = new UserStorage(users);

export default usersStorage;
export { users, usersStorage, hashUserPasswords, setUserHash };
