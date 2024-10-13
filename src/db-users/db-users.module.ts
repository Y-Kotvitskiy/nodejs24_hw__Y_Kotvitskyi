import { Module } from '@nestjs/common';
import { DbUsersController } from './db-users.controller';
import { DbUsersService } from './db-users.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DbUsersController],
  providers: [DbUsersService],
})
export class DbUsersModule {}
