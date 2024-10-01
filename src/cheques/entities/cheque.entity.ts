import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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

  @Column()
  user: string;
}
