import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FormModule } from './form/form.module';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [DatabaseModule, FormModule, CsvModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
