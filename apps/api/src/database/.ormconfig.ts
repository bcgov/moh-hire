import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { DatabaseNamingStrategy } from './database.naming-strategy';
dotenv.config();

// Check typeORM documentation for more information.
export const config: ConnectionOptions = {
  host: process.env.POSTGRES_HOST,
  type: 'postgres',
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  synchronize: true,
  namingStrategy: new DatabaseNamingStrategy(),
};
