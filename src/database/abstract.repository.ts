import { IDBUser } from './interface/dbuser-interface';
import { DatabaseTablesEnum } from './types/enum/database.tables';

export abstract class AbstractRepository {
  //   abstract connect(): Promise<void>;
  //   abstract disconnect(): Promise<void>;
  abstract insertOne(
    table: DatabaseTablesEnum,
    data: IDBUser,
  ): Promise<IDBUser>;
  abstract findOne(table: DatabaseTablesEnum, id: string): Promise<IDBUser>;
}
