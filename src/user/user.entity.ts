import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './enum/role.enum';
import { v4 as uuid } from 'uuid';
import { Cheque } from 'src/cheques/entities/cheque.entity';

@Entity({ name: 'user' }) // es el nombre de la tabla
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column()
  nombre: string;
  @Column()
  email: string;
  @Column({ default: true })
  isActive: boolean;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: Role,
    default: 'user',
  })
  role: string;

  @OneToMany(() => Cheque, (cheque) => cheque.user)
  cheques: Cheque[];
}
