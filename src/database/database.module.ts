import { Module } from '@nestjs/common';
import { MongoRepository } from './mongo.repository';
import { databaseProviders, userProviders } from './database.providers';

@Module({
  providers: [...databaseProviders, ...userProviders, MongoRepository],
  exports: [MongoRepository],
})
export class DatabaseModule {}
