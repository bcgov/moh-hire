import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseNamingStrategy } from './database.naming-strategy';
import { config } from './.ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(config)],
  providers: [],
})
export class DatabaseModule {}
