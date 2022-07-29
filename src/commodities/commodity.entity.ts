import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Commodity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar')
  title: string;

  @ApiProperty()
  @Column('integer')
  price: number;

  @ApiProperty()
  @Column('varchar')
  type: string;
}
