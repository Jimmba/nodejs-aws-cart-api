import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../entities";
import { Repository } from "typeorm";
import { Product } from "../models";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findOrCreateProduct(product: Product): Promise<any> {
    const savedProduct = await this.productRepository.findOne({
      where: {
        id: product.id,
      }
    })

    if (savedProduct) {
      return savedProduct;
    }

    const newProduct = await this.productRepository.create(product);
    await this.productRepository.save(newProduct);
    return newProduct;
  }
}
