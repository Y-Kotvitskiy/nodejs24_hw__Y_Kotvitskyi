import { Inject, Injectable } from '@nestjs/common';
import { AbstractRepository } from 'src/database/abstract.repository';
import { DatabaseFactory } from 'src/database/database.factory';
import { IDBUser } from 'src/database/interface/dbuser-interface';
import { MongoRepository } from 'src/database/mongo.repository';

@Injectable()
export class DbUsersService {
  private dbRepository: AbstractRepository;

  constructor(private databaseFactory: DatabaseFactory) {
    this.dbRepository = databaseFactory.getRepository('mongo');
  }

  async insertOne(user: IDBUser): Promise<IDBUser> {
    return await this.dbRepository.insertOne(user);
  }

  async findOne(id: string): Promise<IDBUser> {
    return this.dbRepository.findOne(id);
  }
}
