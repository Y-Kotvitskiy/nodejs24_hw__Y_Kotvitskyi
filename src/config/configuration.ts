import { DB_CONNECTIONS } from './constatns';

export const configuration = () => ({
  mongodb: {
    MONGO_URI: 'mongodb://admin:password@127.0.0.1:27017',
    MONGO_DB: 'nestjs',
  },
  db: DB_CONNECTIONS.Mongo,
});
