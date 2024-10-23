import { ApiProperty } from '@nestjs/swagger';
import { IDeleteUser } from '../interface/delete-user-interface';

export class DeleteUser implements IDeleteUser {
  @ApiProperty({ description: 'Primary key as user Id', example: 1 })
  id: number;
}
