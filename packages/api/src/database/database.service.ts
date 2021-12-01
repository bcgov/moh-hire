import { Injectable, Inject } from '@nestjs/common';
import { Connection, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(@Inject('Connection') public connection: Connection) {}

  async getRepository<T>(entity: EntityTarget<T>): Promise<Repository<T>> {
    return this.connection.getRepository(entity);
  }
}
