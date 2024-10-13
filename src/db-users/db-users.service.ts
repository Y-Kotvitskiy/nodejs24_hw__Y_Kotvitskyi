import { Injectable } from '@nestjs/common';
import { IDBUser } from 'src/database/interface/dbuser-interface';
import { MongoRepository } from 'src/database/mongo.repository';

@Injectable()
export class DbUsersService {
  constructor(private mongoRepository: MongoRepository) {}

  async insertOne(user: IDBUser): Promise<IDBUser> {
    return await this.mongoRepository.insertOne(user);
  }
}
