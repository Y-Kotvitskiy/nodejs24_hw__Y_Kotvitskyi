import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMonUserDto } from './dto/create-mon-user.dto';
import { MonUser } from './schemas/mon-user.schema';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class MonUserService extends AbstractRepository {
  constructor(
    @InjectModel(MonUser.name) private readonly monUserModel: Model<MonUser>,
  ) {
    super();
  }

  async insertOne(createMonUsertDto: CreateMonUserDto): Promise<MonUser> {
    const createdUser = await this.monUserModel.create(createMonUsertDto);
    return createdUser;
  }

  async findOne(id: string): Promise<MonUser> {
    return this.monUserModel.findOne({ _id: id }).exec();
  }
}
