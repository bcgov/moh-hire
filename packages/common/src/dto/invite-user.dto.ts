import { IsEmail, IsEnum } from 'class-validator';
import { Role } from '../enum';

export class InviteUserDTO {
  @IsEmail()
  email!: string;

  @IsEnum(Role)
  role!: Role;
}
