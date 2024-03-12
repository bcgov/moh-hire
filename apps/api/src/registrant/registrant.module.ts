import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SubmissionModule } from '../submission/submission.module';
import { RegistrantService } from './registrant.service';
import { RegistrantController } from './registrant.controller';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';
import { MassEmailRecordModule } from 'src/mass-email-record/mass-email-record.module';
import { SubmissionEntity } from 'src/submission/entity/submission.entity';

@Module({
  imports: [
    AuthModule,
    SubmissionModule,
    UserModule,
    MailModule,
    MassEmailRecordModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'ehprapp',
    }),
    TypeOrmModule.forFeature([SubmissionEntity]),
  ],
  controllers: [RegistrantController],
  providers: [RegistrantService, Logger],
})
export class RegistrantModule {}
