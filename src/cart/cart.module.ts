import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartItemService, CartService } from './services';
import { CartItemEntity, CartEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    OrderModule
  ],
  providers: [ CartService, CartItemService ],
  controllers: [ CartController ]
})
export class CartModule {}
