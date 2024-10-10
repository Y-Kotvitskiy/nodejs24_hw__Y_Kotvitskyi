import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UserStorage } from 'src/userStorage';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { SetMetadata } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [],
  providers: [
    AuthService,
    UserStorage,
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
