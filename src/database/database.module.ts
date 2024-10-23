import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { MongoRepository } from './mongo.repository';
import { AbstractRepository } from './abstract.repository';

@Module({
  providers: [...databaseProviders, MongoRepository],
  exports: ['DB_REPOSITORY'],
})
export class DatabaseModule {}
