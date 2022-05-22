import { IsString, IsNumber } from 'class-validator';

export class CommodityDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly price: number;
}
