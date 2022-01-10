import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { LoggerOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import config from '../ormconfig';

const getEnvironmentSpecificConfig = (env?: string) => {
  switch (env) {
    case 'production':
      return {
        entitiesPath: join(__dirname, '../**/*.entity.js'),
        migrationPath: join(__dirname, '../migration/*.js'),
        logging: ['migration'],
      };
    case 'test':
      return {
        host: 'localhost',
        database: 'test-db',
        entitiesPath: 'src/**/*.entity.ts',
        migrationPath: 'src/migration/*.js',
        logging: ['error', 'warn', 'migration'],
      };
    default:
      return {
        entitiesPath: 'dist/**/*.entity.js',
        migrationPath: 'dist/migration/*.js',
        logging: ['error', 'warn', 'migration'],
      };
  }
};

const nodeEnv = process.env.NODE_ENV;
const environmentSpecificConfig = getEnvironmentSpecificConfig(nodeEnv);

const appOrmConfig: PostgresConnectionOptions = {
  ...config,
  host: environmentSpecificConfig.host ? environmentSpecificConfig.host : config.host,
  migrations: [environmentSpecificConfig.migrationPath],
  entities: [environmentSpecificConfig.entitiesPath],
  synchronize: false,
  migrationsRun: true,
  logging: environmentSpecificConfig.logging as LoggerOptions,
};
@Module({
  imports: [TypeOrmModule.forRoot(appOrmConfig)],
  providers: [Logger],
})
export class DatabaseModule {}
