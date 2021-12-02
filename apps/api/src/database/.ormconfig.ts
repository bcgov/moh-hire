import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

// Check typeORM documentation for more information.
export const config: ConnectionOptions = {
  host: process.env.POSTGRES_HOST,
  type: 'postgres',
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  synchronize: false,
};
