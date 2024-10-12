import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonUsersController } from './mon-user.controller';
import { MonUser, UserSchema } from './schemas/mon-user.schema';
import { MonUserService } from './mon-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MonUser.name, schema: UserSchema }]),
  ],
  controllers: [MonUsersController],
  providers: [MonUserService],
})
export class MonUserModule {}
