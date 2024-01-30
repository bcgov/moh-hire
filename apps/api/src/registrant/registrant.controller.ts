import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegistrantFilterDTO, RegistrantRO } from '@ehpr/common';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrantService } from './registrant.service';

@Controller('registrants')
@UseGuards(AuthGuard)
@ApiTags('Registrants')
export class RegistrantController {
  constructor(@Inject(RegistrantService) private readonly registrantService: RegistrantService) {}
  @Get('/')
  async getRegistrants(
    @Query() filter: RegistrantFilterDTO,
  ): Promise<[data: RegistrantRO[], count: number]> {
    const registrants = await this.registrantService.getRegistrants(filter);
    return registrants;
  }
}
