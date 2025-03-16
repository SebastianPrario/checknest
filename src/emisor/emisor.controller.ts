import { Controller, Get, Query } from '@nestjs/common';
import { EmisorService } from './emisor.service';

@Controller('emisor')
//@UseGuards(AuthGuard)
export class EmisorController {
  constructor(private readonly emisorService: EmisorService) {}
  @Get('info')
  async emisorInfo(@Query('cuit') cuit: string) {
    return await this.emisorService.emisorInfo(cuit);
  }

  @Get('cheques')
  async chequesInfo(@Query('cuit') cuit: string) {
    return await this.emisorService.chequesInfo(cuit);
  }
}
