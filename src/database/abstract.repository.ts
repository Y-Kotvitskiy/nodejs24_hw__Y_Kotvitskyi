import { IDBUser } from './interface/dbuser-interface';

export abstract class AbstractRepository {
  //   abstract connect(): Promise<void>;
  //   abstract disconnect(): Promise<void>;
  abstract insertOne(data: IDBUser): Promise<IDBUser>;
  abstract findOne(id: string): Promise<IDBUser>;
}
