import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/app.controller';
import { CreateDBUserDto } from './dto/create-db-user.dto';
import { DbUsersService } from './db-users.service';
import { IDBUser } from 'src/database/interface/dbuser-interface';

@Controller('db-users')
export class DbUsersController {
  constructor(private dbUsersService: DbUsersService) {}
  @Public()
  @Post()
  async create(@Body() createDBUserDto: CreateDBUserDto) {
    return await this.dbUsersService.insertOne(createDBUserDto);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IDBUser> {
    return this.dbUsersService.findOne(id);
  }
}
