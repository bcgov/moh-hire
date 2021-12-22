import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import config from '../ormconfig';
import { DatabaseService } from './database.service';

const nodeEnv = process.env.NODE_ENV || 'development';
const migrationPath = nodeEnv === 'production' ? 'migration/*.js' : 'dist/migration/*.js';

const finalConfig: PostgresConnectionOptions = {
  ...config,
  migrations: [migrationPath],
  synchronize: false,
  migrationsRun: false,
};
@Module({
  imports: [TypeOrmModule.forRoot(finalConfig)],
  providers: [DatabaseService, Logger],
  exports: [DatabaseService],
})
export class DatabaseModule {}
