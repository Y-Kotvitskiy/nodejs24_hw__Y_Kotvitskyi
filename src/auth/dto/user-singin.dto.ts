import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UserSingInDto {
  @ApiProperty({
    example: 'John_Smith',
    description: 'The first name of the User',
  })
  @IsNotEmpty({ message: 'Please Enter Login' })
  @IsString({ message: 'Please Enter Valid Login' })
  username: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  @ApiProperty({
    example: 'password',
    description: 'The last name of the User',
  })
  @IsNotEmpty({ message: 'Please Enter Password' })
  @IsString({ message: 'Password' })
  password: string;
}
