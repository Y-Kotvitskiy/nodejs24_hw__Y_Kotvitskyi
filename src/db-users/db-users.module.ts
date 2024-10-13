import { Module } from '@nestjs/common';
import { DbUsersController } from './db-users.controller';
import { DbUsersService } from './db-users.service';

@Module({
  controllers: [DbUsersController],
  providers: [DbUsersService]
})
export class DbUsersModule {}
