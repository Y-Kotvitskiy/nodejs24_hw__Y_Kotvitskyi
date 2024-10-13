import { Module, SetMetadata } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MonUserModule } from './mon-user/mon-user.module';
import { DatabaseModule } from './database/database.module';
import { DbUsersModule } from './db-users/db-users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MonUserModule,
    MongooseModule.forRoot('mongodb://admin:password@127.0.0.1:27017', {
      dbName: 'nestjs',
    }),
    DatabaseModule,
    DbUsersModule,
  ],
  controllers: [AppController, AppController],
  providers: [AppService],
})
export class AppModule {}
