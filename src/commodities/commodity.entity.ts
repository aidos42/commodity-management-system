import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Commodity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;
}
