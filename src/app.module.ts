import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ChequesModule } from './cheques/cheques.module';
import { Cheque } from './cheques/entities/cheque.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { BankModule } from './bank/bank.module';
import { Bank } from './bank/entities/bank.entity';
import { EmisorModule } from './emisor/emisor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    // inicializa la configuracion del JWT para usar en toda la app
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // esta forma no tiene en cuenta las variables de .env
        url: configService.get('DB_URL'),
        // host: configService.get('DB_HOST'),
        // port: configService.get('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_NAME'),
        entities: [User, Cheque, Order, Bank],
        dropSchema: false,
        synchronize: false,
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
        logging: true,
      }),
    }),

    UserModule,

    ChequesModule,

    OrdersModule,

    BankModule,

    EmisorModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
