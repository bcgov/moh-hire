import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SubmissionModule } from './submission/submission.module';
import { AppLogger } from './common/logger.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { RegistrantModule } from './registrant/registrant.module';
import { MassEmailRecordModule } from './mass-email-record/mass-email-record.module';
import { HealthAuthoritiesEntity } from './user/entity/ha.entity';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    SubmissionModule,
    UserModule,
    AdminModule,
    RegistrantModule,
    MassEmailRecordModule,
    HealthAuthoritiesEntity,
  ],
  controllers: [AppController],
  providers: [AppService, AppLogger],
})
export class AppModule {}
