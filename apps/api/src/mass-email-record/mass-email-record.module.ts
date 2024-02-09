import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MassEmailRecordService } from './mass-email-record.service';
import { MassEmailRecordEntity } from './entity/mass-email-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MassEmailRecordEntity])],
  providers: [MassEmailRecordService, Logger],
  exports: [MassEmailRecordService],
})
export class MassEmailRecordModule {}
