import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { SubmissionEntity } from './entity/submission.entity';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { HealthAuthoritiesEntity } from 'src/user/entity/ha.entity';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubmissionEntity, HealthAuthoritiesEntity]),
    MailModule,
    ThrottlerModule.forRoot([
      {
        ttl: 300, // Time-to-live in seconds (5 minutes)
        limit: 1, // Max number of requests allowed per TTL
      },
    ]),
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService, Logger],
  exports: [SubmissionService],
})
export class SubmissionModule {}
