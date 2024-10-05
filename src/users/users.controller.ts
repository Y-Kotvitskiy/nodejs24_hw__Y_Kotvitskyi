import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { IGetUser } from './interface/get-user-interface';
import { IDeleteUser } from './interface/delete-user-interface';
import { UsersService } from './users.service';
import { UserPostDto } from './dto/user-post.dto';
import { UserPatchDto } from './dto/user-patch.dto';
import { Public } from 'src/app.controller';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): IGetUser[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param() params: any): IGetUser {
    return this.userService.getUser(params.id);
  }

  @Post()
  createUser(@Body() dto: UserPostDto): UserPostDto {
    return this.userService.createUser(dto);
  }

  @Put(':id')
  updateUser(@Body() dto: UserPostDto, @Param() params: any): UserPostDto {
    return this.userService.updateUser(params.id, dto);
  }

  @Patch(':id')
  modifyUser(@Body() dto: UserPatchDto, @Param() params: any): UserPostDto {
    return this.userService.modifyUser(params.id, dto);
  }

  @Delete(':id')
  deleteUser(@Param() params: any): IDeleteUser {
    return this.userService.deleteUser(params.id);
  }
}
