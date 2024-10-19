import { IsNotEmpty, IsString } from 'class-validator';

import { ISingUpUser } from '../interface/singup-user';
import { ApiProperty } from '@nestjs/swagger';

export class UserSingUpDto implements ISingUpUser {
  @ApiProperty({ example: 'John', description: 'The first name of the User' })
  @IsNotEmpty({ message: 'Please Enter First Name' })
  @IsString({ message: 'Please Enter Valid Name' })
  firstName: string;

  @ApiProperty({ example: 'Smith', description: 'The last name of the User' })
  @IsNotEmpty({ message: 'Please Enter Last Name' })
  @IsString({ message: 'Please Enter Last Name' })
  lastName: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  @IsNotEmpty({ message: 'Please Enter password' })
  @IsString({ message: 'Please Enter password' })
  password: string;
}
