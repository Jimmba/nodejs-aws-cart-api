import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity, CartEntity } from './cart/entities';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        CartEntity,
        CartItemEntity,
      ],
      synchronize: true,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false
      }
    }),

    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
