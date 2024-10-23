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
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserPatchDto implements IPatchUser {
  @ApiPropertyOptional({
    example: 'John',
    description: 'The first name of the User',
  })
  @IsOptional()
  @IsString({ message: 'Please Enter Valid Name' })
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Smith',
    description: 'The last name of the User',
  })
  @IsOptional()
  @IsString({ message: 'Please Enter Last Name' })
  lastName?: string;

  @ApiPropertyOptional({ example: '30', description: 'The age of the User' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  age?: number;

  @ApiPropertyOptional({
    example: '1',
    description: 'Is the user is student (0 or 1)',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  isStudent?: boolean;
}
