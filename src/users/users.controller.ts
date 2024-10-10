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

  @Public()
  @Get()
  getUsers(): IGetUser[] {
    return this.userService.getUsers();
  }

  @Public()
  @Get(':id')
  getUser(@Param() params: any): IGetUser {
    return this.userService.getUser(params.id);
  }

  @Public()
  @Post()
  createUser(@Body() dto: UserPostDto): UserPostDto {
    return this.userService.addUser(dto);
  }

  @Public()
  @Put(':id')
  updateUser(@Body() dto: UserPostDto, @Param() params: any): UserPostDto {
    return this.userService.updateUser(params.id, dto);
  }

  @Public()
  @Patch(':id')
  modifyUser(@Body() dto: UserPatchDto, @Param() params: any): UserPostDto {
    return this.userService.modifyUser(params.id, dto);
  }

  @Public()
  @Delete(':id')
  deleteUser(@Param() params: any): IDeleteUser {
    return this.userService.deleteUser(params.id);
  }
}
