import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cheque } from 'src/cheques/entities/cheque.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destination: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column()
  detail: string;

  @Column('jsonb', { array: false, default: [] })
  otherPayment: Array<{ property: string; number: number }>;

  @Column()
  creationDate: string;

  @Column({ default: false })
  delete: boolean;

  @Column()
  user: string;

  @OneToMany(() => Cheque, (cheque) => cheque.order) cheque: Cheque[];
}
