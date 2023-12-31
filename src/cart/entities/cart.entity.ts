import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartStatuses } from '../models';
import { CartItemEntity } from './card-item.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  status: CartStatuses;

  @OneToMany(type => CartItemEntity, (cardItem) => cardItem.cart, { cascade: true, eager: true })
  items: CartItemEntity[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
