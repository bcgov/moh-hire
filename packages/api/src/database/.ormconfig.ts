import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

// Check typeORM documentation for more information.
export const config: ConnectionOptions = {
  host: 'db',
  type: 'postgres',
  port: 5432,
  username: 'ehpr-admin',
  password: process.env.POSTGRES_PASSWORD,
  database: 'ehpr2',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  synchronize: false,
};
