import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cheque } from 'src/cheques/entities/cheque.entity';
import { ChequesService } from 'src/cheques/cheques.service';
import { State } from 'src/cheques/enum/state.enum';
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
    return this.orderRepository.manager.transaction(async () => {
      try {
        const newOrder = {
          destination: createOrderDto.destination,
          totalAmount: createOrderDto.totalAmount,
          detail: createOrderDto.detail,
          otherPayment: createOrderDto.otherPayment,
          creationDate: createOrderDto.creationDate,
          user: userId,
        };
        const order = await this.orderRepository.save(newOrder);
        const arrayChecks = createOrderDto.chequesId;
        let controlCheck = false;
        await Promise.all(
          arrayChecks.map(async (cheque: number) => {
            const check: any = await this.ChequeService.findOne(
              newOrder.user,
              cheque,
            );
            // controla que el cheque este en cartera //
            if (check.estado == 'entregado') {
              return (controlCheck = true);
            }
            // si el cheque existe y esta en cartera se actualiza
            check.order = newOrder;
            check.estado = 'entregado';
            check.proveedor = newOrder.destination;
            this.chequesRepository.save(check);
          }),
        );
        if (!controlCheck) return `orden ${order.id} creada`;
        else {
          await this.orderRepository.delete({ id: order.id });
          return 'cheques ya imputados';
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  async findAllOrders(userId: string) {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .where(`order.user = :userId`, { userId })
      .andWhere('order.delete = false')
      .getMany();
    return order;
  }

  async findOne(idOrder: number) {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.cheque', 'cheque')
      .where(`order.id = :idOrder`, { idOrder })
      .getOne();
    const totalOtherPayment = order.otherPayment.reduce(
      (acc, curr) => acc + curr.number,
      0,
    );
git 
    order.totalAmount = totalOtherPayment + Number(order.totalAmount);
    console.log(order.totalAmount);
    return order;
  }

  async remove(idOrder: number, userId) {
    const order = await this.findOne(idOrder);
    if (!order || order.delete === true) return 'orden no encontrada';
    await Promise.all(
      order.cheque.map(async (cheque: any) => {
        const check = await this.ChequeService.findOne(userId, cheque.id);
        if (typeof check === 'object' && check !== null && 'estado' in check) {
          check.estado = State.encartera;
          check.proveedor = '';
          await this.chequesRepository.save(check);
        }
      }),
    );
    order.delete = true;
    order.cheque = [];
    this.orderRepository.save(order);
    return 'orden eliminada';
    // al eliminar la Orden se los cheques relacionados vuelven a estado en cartera
  }
}
