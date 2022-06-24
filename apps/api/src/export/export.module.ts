import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { SubmissionEntity } from 'src/submission/entity/submission.entity';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubmissionEntity]), MailModule],
  providers: [ExportService],
  exports: [ExportService],
  controllers: [ExportController],
})
export class ExportModule {}
