import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { SubmissionModule } from '../submission/submission.module';

@Module({
  imports: [AuthModule, SubmissionModule, UserModule],
  controllers: [AdminController],
})
export class AdminModule {}
