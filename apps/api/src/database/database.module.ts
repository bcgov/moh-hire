import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import config from '../ormconfig';

const nodeEnv = process.env.NODE_ENV || 'development';
const entitiesPath =
  nodeEnv === 'production' ? join(__dirname, '../**/*.entity.js') : 'dist/**/*.entity.js';
const migrationPath =
  nodeEnv === 'production' ? join(__dirname, '../migration/*.js') : 'dist/migration/*.js';

const appOrmConfig: PostgresConnectionOptions = {
  ...config,
  migrations: [migrationPath],
  entities: [entitiesPath],
  synchronize: false,
  migrationsRun: true,
  logging: process.env.TARGET_ENV === 'prod' ? ['migration'] : ['error', 'warn', 'migration'],
};
@Module({
  imports: [TypeOrmModule.forRoot(appOrmConfig)],
  providers: [Logger],
})
export class DatabaseModule {}
