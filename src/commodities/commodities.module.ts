import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommoditiesController } from './commodities.controller';
import { Commodities } from './commodities.entity';
import { CommoditiesService } from './commodities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Commodities])],
  providers: [CommoditiesService],
  controllers: [CommoditiesController],
})
export class CommoditiesModule {}
