import { Logger, Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { SubmissionModule } from '../submission/submission.module';
import { MailModule } from '../mail/mail.module';
import { AdminService } from './admin.service';

@Module({
  imports: [AuthModule, SubmissionModule, UserModule, MailModule],
  controllers: [AdminController],
  providers: [AdminService, Logger],
})
export class AdminModule {}
