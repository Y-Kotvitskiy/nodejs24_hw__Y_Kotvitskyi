import * as mongoose from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMonUserDto } from './dto/create-mon-user.dto';
import { MonUser } from './schemas/mon-user.schema';
import { AbstractRepository } from './abstract.repository';
import { IDBUser } from './interface/dbuser-interface';

@Injectable()
export class MongoRepository extends AbstractRepository {
  constructor(
    @Inject('USER_MODEL') private readonly monUserModel: Model<IDBUser>,
  ) {
    super();
  }

  async insertOne(createMonUsertDto: CreateMonUserDto): Promise<IDBUser> {
    const createdUser = await this.monUserModel.create(createMonUsertDto);
    return createdUser;
  }

  async findOne(id: string): Promise<IDBUser> {
    return this.monUserModel.findOne({ _id: id }).exec();
  }
}
