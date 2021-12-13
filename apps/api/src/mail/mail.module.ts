import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from 'src/form/entity/form.entity';
import { MailService } from './mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity])],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
