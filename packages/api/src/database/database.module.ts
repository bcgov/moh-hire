import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseNamingStrategy } from './database.naming-strategy';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      username: 'ehpr-admin',
      password: 'nosepass',
      database: 'ehpr2',
      entities: [join(__dirname, '../**/**.entity{.ts,.js}')],
      migrations: [join(__dirname, './migrations/**{.ts,.js}')],
      migrationsRun: true,
      synchronize: true,
      dropSchema: false,
      namingStrategy: new DatabaseNamingStrategy(),
      cli: {
        migrationsDir: './migrations',
      },
    }),
  ],
  providers: [],
})
export class DatabaseModule {}
