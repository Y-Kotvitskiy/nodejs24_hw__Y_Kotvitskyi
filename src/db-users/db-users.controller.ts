import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/app.controller';
import { CreateDBUserDto } from './dto/create-db-user.dto';
import { DbUsersService } from './db-users.service';

@Controller('db-users')
export class DbUsersController {
  constructor(private dbUsersService: DbUsersService) {}
  @Public()
  @Post()
  async create(@Body() createDBUserDto: CreateDBUserDto) {
    return await this.dbUsersService.insertOne(createDBUserDto);
  }
}
