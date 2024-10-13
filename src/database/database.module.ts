import { Module } from '@nestjs/common';
import { databaseProviders, userProviders } from './database.providers';
import { DatabaseFactory } from './database.factory';
import { MongoRepository } from './mongo.repository';
import { AbstractRepository } from './abstract.repository';

@Module({
  providers: [
    ...databaseProviders,
    ...userProviders,
    MongoRepository,
    DatabaseFactory,
  ],
  exports: [DatabaseFactory],
})
export class DatabaseModule {}
