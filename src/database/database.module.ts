import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseFactory } from './database.factory';
import { MongoRepository } from './mongo.repository';
import { AbstractRepository } from './abstract.repository';

@Module({
  providers: [...databaseProviders, MongoRepository, DatabaseFactory],
  exports: [DatabaseFactory, 'DB_REPOSITORY'],
})
export class DatabaseModule {}
