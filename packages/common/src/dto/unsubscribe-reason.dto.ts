import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UnsubscribeReasonDTO {
  constructor(base?: UnsubscribeReasonDTO) {
    if (base) {
      this.reason = base.reason;
      this.otherReason = base.otherReason;
    }
  }

  @IsString()
  @IsNotEmpty({ message: 'Please specify a reason' })
  reason!: string;

  @IsString()
  @IsOptional()
  @ValidateIf(r => r.reason === 'Other (please specify)')
  @IsNotEmpty({ message: 'Please provide your other reason' })
  otherReason?: string;
}
