import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartItemService, CartService } from './services';
import { CartItemEntity, CartEntity, ProductEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './services/product.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity, ProductEntity]),
    OrderModule
  ],
  providers: [ CartService, CartItemService, ProductService ],
  controllers: [ CartController ]
})
export class CartModule {}
