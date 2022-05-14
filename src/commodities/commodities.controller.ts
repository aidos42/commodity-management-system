import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommoditiesService } from './commodities.service';
import { CommodityDto } from './dto/commodity.dto';

@Controller('commodities')
export class CommoditiesController {
  constructor(private readonly commoditiesService: CommoditiesService) {}

  @Get()
  getAll(): CommodityDto[] {
    return this.commoditiesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): CommodityDto {
    return this.commoditiesService.getById(id);
  }

  @Post()
  create(@Body() commodityDto: CommodityDto): CommodityDto {
    return this.commoditiesService.create(commodityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `Remove ${id} commodity`;
  }

  @Put(':id')
  update(
    @Body() updateCommodityDto: CommodityDto,
    @Param('id') id: string,
  ): string {
    return `Update commodity ${updateCommodityDto.title} with id ${id}`;
  }
}
