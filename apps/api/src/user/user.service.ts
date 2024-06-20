import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authorities, Role, User, isMoh } from '@ehpr/common';
import { UserEntity } from './entity/user.entity';
import { AppLogger } from '../common/logger.service';
import { HealthAuthoritiesEntity } from './entity/ha.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(HealthAuthoritiesEntity)
    private readonly healthAuthorityRepository: Repository<HealthAuthoritiesEntity>,
    @Inject(Logger)
    private readonly logger: AppLogger,
  ) {}

  async findUser(id: string, email?: string): Promise<UserEntity | null> {
    if (email) {
      return this.userRepository.findOne({ where: [{ id }, { email }] });
    }
    return this.userRepository.findOneBy({ id });
  }

  async findUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async createUser(user: Partial<User>): Promise<UserEntity> {
    if (user.email && !user.ha_id) {
      user.ha_id = await this.assignHa(user.email);
    }
    const userEntity = this.userRepository.create(user);
    const result = await this.userRepository.save(userEntity);
    this.logger.log(`user registered: ${result.id}`);
    return result;
  }

  async changeRole(id: string, role: Role) {
    const user = await this.userRepository.findOneBy({ id });
    if (user && user.role !== role) {
      user.role = role;
      this.logger.log(`user role changed to ${role}: ${id}`);
      return this.userRepository.save(user);
    }
  }

  async updateUser(user: User, update: Partial<User>) {
    if (user.email && !user.ha_id) {
      user.ha_id = await this.assignHa(user.email);
    }

    return this.userRepository.save({ ...user, ...update });
  }

  async revoke(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (user) {
      user.revokedDate = new Date();
      return this.userRepository.save(user);
    }
    throw new InternalServerErrorException('user not found');
  }

  async approve(id: string) {
    const user = await this.userRepository.findOneBy({ id });
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

  // get health authority by id
  async getHealthAuthorityId(domain: string): Promise<number | undefined> {
    const ha = Object.values(Authorities).find(a => a.domains.includes(domain));

    if (ha) {
      const haEntity = await this.healthAuthorityRepository.findOne({ where: { name: ha.name } });
      return haEntity?.id;
    }

    return undefined;
  }

  // assign users HA based on email domain
  async assignHa(email: string) {
    if (isMoh(email)) {
      return undefined;
    } else {
      const domain = email.split('@')[1];
      return this.getHealthAuthorityId(domain);
    }
  }
}
