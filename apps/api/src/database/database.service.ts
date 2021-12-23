import { Injectable, Inject, Logger, LoggerService } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    @InjectConnection() public connection: Connection,
  ) {
    this.logger.log(`DatabaseService created`);
    this.logger.log({ migrations: connection.migrations });
  }

  async runMigrations() {
    this.logger.log(`Running migrations`);
    try {
      const migrations = await this.connection.runMigrations();
      if (migrations.length > 0) {
        const successfulMigrationNames = migrations.map(migration => migration.name).join(', ');

        this.logger.log(
          `Successfully completed migrations:${JSON.stringify(successfulMigrationNames)}`,
        );
      } else {
        this.logger.log(`No new migrations`);
      }
    } catch (error) {
      this.logger.error(`Migrations failed with ${error}`);
      throw error;
    }
  }
}
