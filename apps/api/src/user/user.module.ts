import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { HealthAuthoritiesEntity } from './entity/ha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, HealthAuthoritiesEntity])],
  controllers: [UserController],
  providers: [UserService, Logger, AuthService],
  exports: [UserService],
})
export class UserModule {}
