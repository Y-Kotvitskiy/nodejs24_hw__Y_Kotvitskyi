import { MongoRepository } from './mongo.repository';
import { ConfigService } from '@nestjs/config';
import { DB_CONNECTIONS } from 'src/config/constatns';

export const databaseProviders = [
  {
    provide: 'DB_REPOSITORY',
    useFactory: async (configService: ConfigService) => {
      if (configService.get<string>('db') === DB_CONNECTIONS.Mongo) {
        const mongo_uri = configService.get<string>('mongodb.MONGO_URI');
        const mongo_db = configService.get<string>('mongodb.MONGO_DB');
        const dbRepository = new MongoRepository();
        await dbRepository.connect(mongo_uri, mongo_db);
        return dbRepository;
      }
    },
    inject: [ConfigService],
  },
];
