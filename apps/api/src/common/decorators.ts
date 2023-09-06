import { SetMetadata } from '@nestjs/common';
import { Role } from '@ehpr/common';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
