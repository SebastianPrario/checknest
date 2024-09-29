import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './../../user/user.entity';
import { State } from '../enum/state.enum';
@Entity()
export class Cheque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  importe: number;

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
    default: 'encartera',
  })
  estado: string;

  @Column()
  proveedor: string;

  @Column({ default: false })
  borrado: boolean;

  @ManyToOne(() => User, (user) => user.cheques)
  user: User;
}
