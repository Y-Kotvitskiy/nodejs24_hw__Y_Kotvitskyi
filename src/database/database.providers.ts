import * as mongoose from 'mongoose';
import { MonUser } from './schemas/mon-user.schema';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://admin:password@127.0.0.1:27017', {
        dbName: 'nestjs',
      }),
  },
];

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (mongoose: mongoose.Mongoose) =>
      mongoose.model('User', MonUser),
    inject: ['DATABASE_CONNECTION'],
  },
];
