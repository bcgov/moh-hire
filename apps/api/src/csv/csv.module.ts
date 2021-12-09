import { Module } from '@nestjs/common';
import { FormModule } from 'src/form/form.module';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';


@Module({
  imports: [FormModule],
  controllers: [CsvController],
  providers: [CsvService],
})

export class CsvModule {}
