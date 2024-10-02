import {
  IsBoolean,
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsString,
  Max,
  IsOptional,
} from 'class-validator';

import { IPatchUser } from '../interface/patch-user-interface';
import { Type } from 'class-transformer';

export class UserPatchDto implements IPatchUser {
  @IsOptional()
  @IsString({ message: 'Please Enter Valid Name' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Please Enter Last Name' })
  lastName?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  age?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  isStudent?: boolean;
}
