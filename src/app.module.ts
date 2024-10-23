import { Module, SetMetadata } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MonUserModule } from './mon-user/mon-user.module';
import { DatabaseModule } from './database/database.module';
import { DbUsersModule } from './db-users/db-users.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    //    MonUserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    DatabaseModule,
    DbUsersModule,
  ],
  controllers: [AppController, AppController],
  providers: [AppService],
})
export class AppModule {}
