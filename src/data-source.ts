// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { Cheque } from './cheques/entities/cheque.entity';
import { Order } from './orders/entities/order.entity';
import { Bank } from './bank/entities/bank.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://gestion_owner:5gTlmiX2vxnb@ep-small-cherry-a5jxzoe3.us-east-2.aws.neon.tech/gestion?sslmode=require,',
  entities: [User, Cheque, Order, Bank],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
});
