import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { FormEntity } from './entity/form.entity';
import { FormController } from './form.controller';
import { FormService } from './form.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity]), MailModule],
  controllers: [FormController],
  providers: [FormService, Logger],
  exports: [FormService],
})
export class FormModule {}
