import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cheque } from 'src/cheques/entities/cheque.entity';
import { User } from 'src/user/user.entity';
import { Order } from './entities/order.entity';
import { ChequesService } from 'src/cheques/cheques.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cheque, User, Order])],
  controllers: [OrdersController],
  providers: [OrdersService, ChequesService],
  exports: [OrdersService],
})
export class OrdersModule {}
