import { Module } from '@nestjs/common';
import { EmisorService } from './emisor.service';
import { EmisorController } from './emisor.controller';

@Module({
  controllers: [EmisorController],
  providers: [EmisorService],
})
export class EmisorModule {}
