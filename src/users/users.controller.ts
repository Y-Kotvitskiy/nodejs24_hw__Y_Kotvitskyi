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
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatedUser } from './view-models/created-user.model';
import { GetUser } from './view-models/get-user-model';
import { DeleteUser } from './view-models/delete-user.model';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Get all users. Public' })
  @ApiCreatedResponse({ type: GetUser, isArray: true })
  @Public()
  @Get()
  getUsers(): IGetUser[] {
    return this.userService.getUsers();
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'User ID',
    example: 1,
  })
  @ApiCreatedResponse({ type: GetUser })
  @ApiOperation({ summary: 'Get user by id. Public' })
  @Public()
  @Get(':id')
  getUser(@Param() params: any): IGetUser {
    return this.userService.getUser(params.id);
  }

  @ApiCreatedResponse({
    description: 'Created User object as responce',
    type: CreatedUser,
  })
  @ApiOperation({ summary: 'Create new User. Public' })
  @ApiResponse({ status: 201, description: 'User has been created.' })
  @ApiResponse({ status: 409, description: 'Forbidden.' })
  @Public()
  @Post()
  createUser(@Body() dto: UserPostDto): UserPostDto {
    return this.userService.addUser(dto);
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'User ID',
    example: 1,
  })
  @ApiCreatedResponse({ type: GetUser })
  @ApiOperation({ summary: 'Modify User fields by id. Public' })
  @Public()
  @Put(':id')
  updateUser(@Body() dto: UserPostDto, @Param() params: any): UserPostDto {
    return this.userService.updateUser(params.id, dto);
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'User ID',
    example: 1,
  })
  @ApiCreatedResponse({ type: GetUser })
  @ApiOperation({ summary: 'Modify User by id. Public' })
  @Public()
  @Patch(':id')
  modifyUser(@Body() dto: UserPatchDto, @Param() params: any): UserPostDto {
    return this.userService.modifyUser(params.id, dto);
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'User ID',
    example: 1,
  })
  @ApiOperation({ summary: 'Delete user by id. Public' })
  @ApiCreatedResponse({ type: DeleteUser })
  @Public()
  @Delete(':id')
  deleteUser(@Param() params: any): IDeleteUser {
    return this.userService.deleteUser(params.id);
  }
}
