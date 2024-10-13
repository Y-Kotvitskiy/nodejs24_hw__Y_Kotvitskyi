import { Injectable } from '@nestjs/common';
import { MongoRepository } from './mongo.repository';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class DatabaseFactory {
  constructor(private mongoRepository: MongoRepository) {}

  getRepository(dbType: string): AbstractRepository {
    if (dbType === 'mongo') return this.mongoRepository;
  }
}
