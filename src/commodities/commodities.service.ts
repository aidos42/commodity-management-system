import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commodity } from './commodity.entity';

@Injectable()
export class CommoditiesService {
  constructor(
    @InjectRepository(Commodity)
    private commoditiesRepository: Repository<Commodity>,
  ) {}

  findAll(): Promise<Commodity[]> {
    return this.commoditiesRepository.find();
  }

  findOne(id: string): Promise<Commodity> {
    return this.commoditiesRepository.findOne(id);
  }

  create(commodity: Commodity): Promise<Commodity> {
    return this.commoditiesRepository.save(commodity);
  }

  async update(commodity: Commodity): Promise<Commodity> {
    return this.commoditiesRepository.save(commodity);
  }

  async remove(id: string): Promise<void> {
    await this.commoditiesRepository.delete(id);
  }
}
