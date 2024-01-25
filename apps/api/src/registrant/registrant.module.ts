import { Logger, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SubmissionModule } from '../submission/submission.module';
import { RegistrantService } from './registrant.service';
import { RegistrantController } from './registrant.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, SubmissionModule, UserModule],
  controllers: [RegistrantController],
  providers: [RegistrantService, Logger],
})
export class RegistrantModule {}
