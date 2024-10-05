import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { users } from './userStorage';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from './constans';

async function hashUserPasswords() {
  for (const userId in users) {
    if (userId !== 'passwd')
      users.passwd[userId] = await bcrypt.hash(
        users.passwd[userId],
        saltOrRounds,
      );
  }
}

async function bootstrap() {
  await hashUserPasswords();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
