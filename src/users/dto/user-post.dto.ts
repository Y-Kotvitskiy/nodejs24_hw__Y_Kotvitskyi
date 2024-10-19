import {
  IsBoolean,
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsString,
  Max,
} from 'class-validator';

import { IPostUser } from '../interface/post-user-interface';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserPostDto implements IPostUser {
  @ApiProperty({ example: 'John', description: 'The first name of the User' })
  @IsNotEmpty({ message: 'Please Enter First Name' })
  @IsString({ message: 'Please Enter Valid Name' })
  firstName: string;

  @ApiProperty({ example: 'Smith', description: 'The last name of the User' })
  @IsNotEmpty({ message: 'Please Enter Last Name' })
  @IsString({ message: 'Please Enter Last Name' })
  lastName: string;

  @ApiProperty({ example: '30', description: 'The age of the User' })
  @IsNotEmpty()
  @Max(100)
  @IsNumber()
  @Type(() => Number)
  age: number;

  @ApiProperty({ example: '1', description: 'Is the user is student (0 or 1)' })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  isStudent: boolean;
}
