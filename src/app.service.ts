import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commodity } from './commodities/commodity.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Commodity)
    private commoditiesRepository: Repository<Commodity>,
  ) {}

  index() {
    return this.commoditiesRepository.find();
  }
}
