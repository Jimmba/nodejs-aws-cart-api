import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CartEntity } from './cart.entity';


@Entity()
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cartId: string;

  @ManyToOne(type => CartEntity, (cart) => cart.items)
  @JoinColumn({name: 'cartId'})
  cart: CartEntity;

  @Column()
  productId: string;

  @Column()
  count: number;

  // @ManyToOne(type => ProductEntity, (product) => product.products, {
  //   eager: true,
  //   cascade: true
  // })
  // product: ProductEntity;
}
