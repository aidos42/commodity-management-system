import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Commodities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;
}
