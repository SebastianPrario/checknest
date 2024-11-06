import { Module } from '@nestjs/common';
import { ChequesService } from './cheques.service';
import { ChequesController } from './cheques.controller';
import { Cheque } from './entities/cheque.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cheque, User, Order])],
  controllers: [ChequesController],
  providers: [ChequesService, OrdersService],
  exports: [ChequesService],
})
export class ChequesModule {}
