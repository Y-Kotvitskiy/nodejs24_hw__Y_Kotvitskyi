import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IDBUser } from '../interface/dbuser-interface';

@Schema()
export class MonUser implements IDBUser {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(MonUser);
