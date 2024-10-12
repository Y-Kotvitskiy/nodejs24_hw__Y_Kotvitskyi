import { Module, SetMetadata } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MonUserModule } from './mon-user/mon-user.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MonUserModule,
    MongooseModule.forRoot('mongodb://admin:password@localhost:27017', {
      dbName: 'nestjs',
    }),
    //      'mongodb://localhost:27017/'),
    // mongodb+srv://[username:password@]host[/[defaultauthdb]
  ],
  controllers: [AppController, AppController],
  providers: [AppService],
})
export class AppModule {}
