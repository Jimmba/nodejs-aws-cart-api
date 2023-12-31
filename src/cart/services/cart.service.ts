import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartItem, CartStatuses, MOCKED_PRODUCTS } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities';
import { CartItemService } from './cart-item.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    private cartItemService: CartItemService,
  ){}

  async findByUserId(userId: string): Promise<Cart> {
    const carts = await this.cartRepository.findOne({
      where: {
        userId,
        status: CartStatuses.OPEN,
      }
    });

    // if (carts) return this.getProducts(carts);
    return carts;
  }

  async createByUserId(userId: string) {
    const id = v4();
    const userCart = {
      id,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: CartStatuses.OPEN,
      items: [],
    };

    const cart = await this.cartRepository.create(userCart);
    await this.cartRepository.save(cart);

    return this.findByUserId(userId);
  }


  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);
    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, cartItem: CartItem): Promise<Cart> {
    const { id: cartId } = await this.findOrCreateByUserId(userId);

    await this.cartItemService.updateCartItem(cartId, cartItem);
    return this.findByUserId(userId);
  }

  async removeByUserId(userId): Promise<void> {
    const { id: cartId } = await this.findOrCreateByUserId(userId);
    await this.cartItemService.removeCartItemsByCartId(cartId);
    await this.cartRepository.delete({userId});
  }

  getProducts(cart: CartEntity): Cart {
    const { items, ...data } = cart;
    const itemsWithProducts = items.map(item => {
      const { productId, count } = item;
      return {
        product: MOCKED_PRODUCTS.find(product => product.id === productId),
        count,
      }
    })

    return {
      ...data,
      items: itemsWithProducts,
    }
  }

}
