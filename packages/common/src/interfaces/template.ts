import { User } from './user';

export interface Template {
  id: string;
  title: string;
  content: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
