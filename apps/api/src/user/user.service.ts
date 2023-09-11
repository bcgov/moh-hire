import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, User } from '@ehpr/common';
import { UserEntity } from './entity/user.entity';
import { AppLogger } from '../common/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(Logger)
    private readonly logger: AppLogger,
  ) {}

  async findUser(id: string, email?: string): Promise<UserEntity | undefined> {
    if (email) {
      return this.userRepository.findOne({ where: [{ id }, { email }] });
    }
    return this.userRepository.findOne(id);
  }

  async findUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async createUser(user: Partial<User>): Promise<UserEntity> {
    const userEntity = this.userRepository.create(user);
    const result = await this.userRepository.save(userEntity);
    this.logger.log(`user registered: ${result.id}`);
    return result;
  }

  async changeRole(id: string, role: Role) {
    const user = await this.userRepository.findOne(id);
    if (user && user.role !== role) {
      user.role = role;
      this.logger.log(`user role changed to ${role}: ${id}`);
      return this.userRepository.save(user);
    }
  }

  async updateUser(user: User, update: Partial<User>) {
    return this.userRepository.save({ ...user, ...update });
  }

  async revoke(id: string) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      user.revokedDate = new Date();
      return this.userRepository.save(user);
    }
    throw new InternalServerErrorException('user not found');
  }

  async approve(id: string) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      user.active = true;
      user.revokedDate = null;
      if (user.role === Role.Pending) {
        user.role = Role.User;
      }
      return this.userRepository.save(user);
    }
    throw new InternalServerErrorException('user not found');
  }
}
