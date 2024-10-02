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

export class UserPostDto implements IPostUser {
  @IsNotEmpty({ message: 'Please Enter First Name' })
  @IsString({ message: 'Please Enter Valid Name' })
  firstName: string;

  @IsNotEmpty({ message: 'Please Enter Last Name' })
  @IsString({ message: 'Please Enter Last Name' })
  lastName: string;

  @IsNotEmpty()
  @Max(100)
  @IsNumber()
  @Type(() => Number)
  age: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  isStudent: boolean;
}
