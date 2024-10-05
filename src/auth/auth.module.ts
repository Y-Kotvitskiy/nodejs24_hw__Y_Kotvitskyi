import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UserStorage } from 'src/userStorage';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { SetMetadata } from '@nestjs/common';

@Module({
  imports: [],
  providers: [
    AuthService,
    UserStorage,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
