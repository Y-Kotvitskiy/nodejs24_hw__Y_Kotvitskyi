import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MonUserService } from './mon-user.service';
import { CreateMonUserDto } from './dto/create-mon-user.dto';
import { MonUser } from './schemas/mon-user.schema';
import { Public } from 'src/app.controller';

@Controller('mon-users')
export class MonUsersController {
  constructor(private readonly catsService: MonUserService) {}

  @Public()
  @Post()
  async create(@Body() createCatDto: CreateMonUserDto) {
    await this.catsService.create(createCatDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<MonUser[]> {
    return this.catsService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MonUser> {
    return this.catsService.findOne(id);
  }

  @Public()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
