import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMonUserDto } from './dto/create-mon-user.dto';
import { MonUser } from './schemas/mon-user.schema';

@Injectable()
export class MonUserService {
  constructor(
    @InjectModel(MonUser.name) private readonly monUserModel: Model<MonUser>,
  ) {}

  async create(createCatDto: CreateMonUserDto): Promise<MonUser> {
    const createdCat = await this.monUserModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<MonUser[]> {
    return this.monUserModel.find().exec();
  }

  async findOne(id: string): Promise<MonUser> {
    return this.monUserModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.monUserModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedCat;
  }
}
