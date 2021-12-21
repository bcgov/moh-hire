import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionEntity } from 'src/submission/entity/submission.entity';
import { MailService } from './mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubmissionEntity])],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
