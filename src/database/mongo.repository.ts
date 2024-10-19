import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Model, Mongoose } from 'mongoose';
import { CreateMonUserDto } from './dto/create-mon-user.dto';
import { AbstractRepository } from './abstract.repository';
import { IDBUser } from './interface/dbuser-interface';
import { MonUser } from './schemas/mon-user.schema';
import { DatabaseTablesEnum } from './types/enum/database.tables';

@Injectable()
export class MongoRepository extends AbstractRepository {
  client: Mongoose;

  constructor() {
    super();
  }

  async connect(): Promise<void> {
    await mongoose.connect('mongodb://admin:password@127.0.0.1:27017', {
      dbName: 'nestjs',
    });
  }

  async insertOne(
    table: DatabaseTablesEnum,
    createMonUsertDto: CreateMonUserDto,
  ): Promise<IDBUser> {
    const model = this.getModel(table);
    const createdUser = await model.create(createMonUsertDto);
    return createdUser;
  }

  async findOne(table: DatabaseTablesEnum, id: string): Promise<IDBUser> {
    const model = this.getModel(table);
    return model.findOne({ _id: id }).exec();
  }

  private getModel(table: DatabaseTablesEnum): mongoose.Model<any> {
    switch (table) {
      case 'User':
        return mongoose.model('User', MonUser);

      default:
        break;
    }
  }
}
