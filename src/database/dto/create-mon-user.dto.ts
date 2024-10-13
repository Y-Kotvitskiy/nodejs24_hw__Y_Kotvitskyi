import { IDBUser } from '../interface/dbuser-interface';

export class CreateMonUserDto implements IDBUser {
  readonly name: string;
  readonly age: number;
}
