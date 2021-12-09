import { IsNotEmpty, IsString } from 'class-validator';

export class ExportDTO {
  @IsString()
  @IsNotEmpty()
  passCode!: string;
}
