import { Role } from '../enum';

export interface User {
  id: string;
  role?: Role;
  name?: string;
}
