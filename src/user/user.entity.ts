import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './enum/role.enum';
import { v4 as uuid } from 'uuid';

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
}
