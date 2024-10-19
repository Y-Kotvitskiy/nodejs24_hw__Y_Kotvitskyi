import { MongoRepository } from './mongo.repository';

export const databaseProviders = [
  {
    provide: 'DB_REPOSITORY',
    useFactory: async () => {
      const dbRepository = new MongoRepository();
      await dbRepository.connect();
      return dbRepository;
    },
  },
];
