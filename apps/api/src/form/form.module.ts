import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { FormEntity } from './entity/form.entity';
import { FormController } from './form.controller';
import { FormService } from './form.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity])],
  controllers: [FormController],
  providers: [FormService, MailService],
  exports: [FormService],
})
export class FormModule {}
