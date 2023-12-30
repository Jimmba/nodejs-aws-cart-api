import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItemEntity } from './card-item.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToMany(type => CartItemEntity, (cardItem) => cardItem.productId)
  products: CartItemEntity[];
}
