import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UserStorage } from 'src/userStorage';

@Module({
  imports: [UsersModule],
  providers: [AuthService, UserStorage],
  controllers: [AuthController],
})
export class AuthModule {}
