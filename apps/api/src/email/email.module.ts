import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from 'src/form/entity/form.entity';
import { EmailService } from './email.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity])],
  controllers: [],
  providers: [EmailService],
})
export class EmailModule {}
