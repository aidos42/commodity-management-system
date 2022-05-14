import { Injectable } from '@nestjs/common';
import { CommodityDto } from './dto/commodity.dto';

@Injectable()
export class CommoditiesService {
  private commodities: CommodityDto[] = [
    {
      title: 'bom',
      price: 42,
      id: '0',
    },
    {
      title: 'bam',
      price: 1764,
      id: '1',
    },
    {
      title: 'bim',
      price: 3111696,
      id: '2',
    },
  ];

  getAll(): CommodityDto[] {
    return this.commodities;
  }

  getById(id: string): CommodityDto {
    return this.commodities.find((c) => c.id === id);
  }

  create(commodityDto: CommodityDto): CommodityDto {
    this.commodities.push(commodityDto);

    return commodityDto;
  }
}
