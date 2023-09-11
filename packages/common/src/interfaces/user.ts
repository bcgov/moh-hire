import { Role } from '../enum';

export interface User {
  id: string;
  role?: Role;
  name?: string;
  email?: string;
  createdDate?: Date;
  active?: boolean;
  revokedDate?: Date | null;
}
