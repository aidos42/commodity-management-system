import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommoditiesController } from './commodities.controller';
import { Commodity } from './commodity.entity';
import { CommoditiesService } from './commodities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Commodity])],
  providers: [CommoditiesService],
  controllers: [CommoditiesController],
})
export class CommoditiesModule {}
