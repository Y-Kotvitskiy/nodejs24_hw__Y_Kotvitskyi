import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<MonUser>;

@Schema()
export class MonUser {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(MonUser);
