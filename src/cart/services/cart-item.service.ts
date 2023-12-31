import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItemEntity, ProductEntity } from "../entities";
import { Repository } from "typeorm";
import { ProductService } from "./product.service";
import { CartItem } from "../models";

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
    private productService: ProductService,
  ){}

  async createCartItem(cartId: string, cartItem: CartItem): Promise<CartItemEntity> {
    const { product, count } = cartItem;
    const { id: productId } = product;

    await this.productService.findOrCreateProduct(product);

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

  async updateCartItem(cartId: string, cartItem: CartItem): Promise<void> {
    const { product, count } = cartItem;
    const { id: productId } = product;

    const item = await this.findCartItem(cartId, productId);

    if (item) {
      if (count === 0) {
        await this.cartItemRepository.delete(item.id);
        return;
      }

      item.count = count,
      await this.cartItemRepository.save(item);
    } else {
      await this.createCartItem(cartId, cartItem);
    }
  }

  async removeCartItemsByCartId(cartId: string): Promise<void> {
    await this.cartItemRepository.delete({cartId});
  }
}
