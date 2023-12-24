import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItemEntity } from "../entities";
import { Repository } from "typeorm";

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
  ){}

  async createCartItem(cartId: string, productId: string, count: number): Promise<CartItemEntity> {
    const item = new CartItemEntity();
    item.cartId = cartId;
    item.productId = productId;
    item.count = count;

    return await this.cartItemRepository.save(item);
  }

  async findCartItem(cartId: string, productId: string): Promise<CartItemEntity> {
    return await this.cartItemRepository.findOne(
      {
        where: {
          productId,
          cartId,
        }
      });
  }

  async updateCartItem(cartId: string, productId: string, count: number): Promise<CartItemEntity> {
    const item = await this.findCartItem(cartId, productId);

    if (item) {
      item.count = count,
      await this.cartItemRepository.save(item);
    } else {
      return this.createCartItem(cartId, productId, count);
    }
  }

  async removeCartItem(cartId: string): Promise<void> {
    await this.cartItemRepository.delete({cartId});
  }
}
