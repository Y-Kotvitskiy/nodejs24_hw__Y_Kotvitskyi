import { IsNotEmpty, IsString } from 'class-validator';

import { ISingUpUser } from '../interface/singup-user';

export class UserSingUpDto implements ISingUpUser {
  @IsNotEmpty({ message: 'Please Enter First Name' })
  @IsString({ message: 'Please Enter Valid Name' })
  firstName: string;

  @IsNotEmpty({ message: 'Please Enter Last Name' })
  @IsString({ message: 'Please Enter Last Name' })
  lastName: string;

  @IsNotEmpty({ message: 'Please Enter password' })
  @IsString({ message: 'Please Enter password' })
  password: string;
}
