import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cheque } from 'src/cheques/entities/cheque.entity';
import { ChequesService } from 'src/cheques/cheques.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Cheque)
    private chequesRepository: Repository<Cheque>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly ChequeService: ChequesService,
  ) {}
  // crear orden en BD relacionado con ID del usuario
  async create(createOrderDto: CreateOrderDto, userId: string) {
    try {
      const newOrder = {
        destination: createOrderDto.destination,
        totalAmount: createOrderDto.totalAmount,
        detail: createOrderDto.detail,
        otherPayment: createOrderDto.otherPayment,
        creationDate: createOrderDto.creationDate,
        user: userId,
      };
      await this.orderRepository.save(newOrder);
      const arrayChecks = createOrderDto.chequesId;
      let controlCheck = false;
      arrayChecks.forEach((cheque: number) => {
        this.ChequeService.findOne(newOrder.user, cheque).then((response) => {
          const check: any = response;
          // controla que el cheque este en cartera //
          if (check.estado === 'entregado') return (controlCheck = true);
          // si el cheque existe y esta en cartera se actualiza
          check.order = newOrder;
          check.estado = 'entregado';
          check.proveedor = newOrder.destination;
          this.chequesRepository.save(check);
        });
      });
      if (controlCheck) return 'orden creada';
      else return 'cheques ya imputados';
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(idOrder: number, userId: string) {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.cheque', 'cheque')
      .where(`order.id = ${idOrder}`, { idOrder })
      .getOne();
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    //return `This action updates a #${id} order`;
  }

  remove(id: number) {
    //return `This action removes a #${id} order`;
  }
}
