import { Module } from '@nestjs/common';
import { CommoditiesController } from './commodities.controller';
import { CommoditiesService } from './commodities.service';

@Module({
  providers: [CommoditiesService],
  controllers: [CommoditiesController],
})
export class CommoditiesModule {}
