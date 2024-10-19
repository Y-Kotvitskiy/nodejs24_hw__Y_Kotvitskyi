import { ApiProperty } from '@nestjs/swagger';
import { IGetUser } from '../interface/get-user-interface';

export class GetUser implements IGetUser {
  @ApiProperty({ description: 'Primary key as user Id', example: 1 })
  id: number;
  @ApiProperty({ description: 'Firs name', example: 'John' })
  firstName: string;
  @ApiProperty({ description: 'Last name', example: 'Smith' })
  lastName: string;
  @ApiProperty({ description: 'User age', example: 25 })
  age: number;
  @ApiProperty({ description: 'Is student', example: false })
  isStudent: boolean;
}
