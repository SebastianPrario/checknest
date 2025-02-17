import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bank' })
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bank: string;

  @Column()
  user: string;
}
