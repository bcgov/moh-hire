import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { SubmissionEntity } from './entity/submission.entity';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { HealthAuthoritiesEntity } from 'src/user/entity/ha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubmissionEntity, HealthAuthoritiesEntity]), MailModule],
  controllers: [SubmissionController],
  providers: [SubmissionService, Logger],
  exports: [SubmissionService],
})
export class SubmissionModule {}
