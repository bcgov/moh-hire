import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DatabaseNamingStrategy } from './database/database.naming-strategy';
dotenv.config();
// Check typeORM documentation for more information.

const nodeEnv = process.env.NODE_ENV || 'development';
const entitiesPath = nodeEnv === 'production' ? './**/*.entity.js' : 'dist/**/*.entity.js';
const migrationPath = nodeEnv === 'production' ? './migration/*.js' : 'dist/migration/*.js';

console.log({ entitiesPath, migrationPath, nodeEnv });

const config: PostgresConnectionOptions = {
  host: process.env.POSTGRES_HOST,
  type: 'postgres',
  port: 5432,
  connectTimeoutMS: 5000,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [entitiesPath],
  migrations: [migrationPath],
  cli: {
    migrationsDir: 'src/migration',
    entitiesDir: 'src/**/entity/*.entity.ts',
  },
  synchronize: false,
  migrationsRun: true,
  namingStrategy: new DatabaseNamingStrategy(),
};

export default config;
