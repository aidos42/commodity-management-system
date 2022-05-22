import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Commodity } from './commodity.entity';
import { CommoditiesService } from './commodities.service';
import { CommodityDto } from './dto/commodity.dto';

@Controller('commodities')
export class CommoditiesController {
  constructor(private readonly commoditiesService: CommoditiesService) {}

  @Get()
  getAll(): Promise<Commodity[]> {
    return this.commoditiesService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Commodity> {
    const commodity = await this.commoditiesService.findOne(id);

    if (commodity === undefined) {
      throw new NotFoundException(`Commodity with id: ${id} not exists`);
    }

    return commodity;
  }

  @Post()
  create(@Body() commodityDto: CommodityDto): Promise<Commodity> {
    const commodity = new Commodity();
    commodity.title = commodityDto.title;
    commodity.price = commodityDto.price;

    return this.commoditiesService.create(commodity);
  }

  @Put(':id')
  async update(
    @Body() updateCommodityDto: CommodityDto,
    @Param('id') id: string,
  ): Promise<Commodity> {
    const commodity = await this.commoditiesService.findOne(id);

    if (commodity === undefined) {
      throw new NotFoundException(`Commodity with id: ${id} not exists`);
    }

    commodity.title = updateCommodityDto.title;
    commodity.price = updateCommodityDto.price;

    return this.commoditiesService.update(commodity);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.commoditiesService.remove(id);
  }
}
