import { Module } from '@nestjs/common';
import { ChequesService } from './cheques.service';
import { ChequesController } from './cheques.controller';
import { Cheque } from './entities/cheque.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cheque, User])],
  controllers: [ChequesController],
  providers: [ChequesService],
})
export class ChequesModule {}
