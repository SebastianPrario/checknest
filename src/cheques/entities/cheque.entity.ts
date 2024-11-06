import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { State } from '../enum/state.enum';

@Entity()
export class Cheque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  importe: number;

  @Column()
  cliente: string;

  @Column()
  librador: string;

  @Column()
  fechaEmision: string;

  @Column()
  fechaEntrega: string;

  @Column()
  banco: string;

  @Column({
    type: 'enum',
    enum: State,
    default: State.encartera,
  })
  estado: string;

  @Column({
    default: null,
  })
  proveedor: string;

  @Column({ default: false })
  borrado: boolean;

  @Column()
  user: string;

  @ManyToOne(() => Order, (order) => order.cheque) order: Order;
}
