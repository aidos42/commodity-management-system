import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Commodity } from './commodity.entity';
import { CommoditiesService } from './commodities.service';
import { CommodityDto } from './dto/commodity.dto';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InsertResult } from 'typeorm';
import * as codes from 'http-codes';
import { PayloadExistance } from './payloadExistance.guard';

@ApiTags('commodities')
@Controller('api/commodities')
export class CommoditiesController {
  constructor(private readonly commoditiesService: CommoditiesService) {}

  @Get()
  @ApiResponse({
    status: codes.OK,
    description: 'get all commodities or filtered by price',
    type: [Commodity],
  })
  @ApiQuery({ name: 'price', required: false })
  getAll(@Query() query: { price: string }): Promise<Commodity[]> {
    if (query.price === undefined) {
      return this.commoditiesService.findAll();
    }

    return this.commoditiesService.findByPrice(Number(query.price));
  }

  @Get(':id')
  @ApiResponse({
    status: codes.OK,
    description: 'get commodity by id',
    type: Commodity,
  })
  async getById(@Param('id') id: string): Promise<Commodity> {
    const commodity = await this.commoditiesService.findOne(id);

    if (commodity === undefined) {
      throw new NotFoundException(`Commodity with id: ${id} not exists`);
    }

    return commodity;
  }

  @Post()
  @ApiResponse({
    status: codes.CREATED,
    description: 'create commodity',
    type: Commodity,
  })
  @ApiBody({ type: CommodityDto })
  @UseGuards(PayloadExistance)
  async create(@Body() commodityDto: CommodityDto): Promise<InsertResult> {
    const commodity = new Commodity();
    commodity.title = commodityDto.title;
    commodity.price = commodityDto.price;
    commodity.type = commodityDto.type;

    return this.commoditiesService.create(commodity);
  }

  @Put(':id')
  @ApiResponse({
    status: codes.OK,
    description: 'update commodity by id',
    type: Commodity,
  })
  @ApiBody({ type: CommodityDto })
  @UseGuards(PayloadExistance)
  async update(
    @Body() updateCommodityDto: CommodityDto,
    @Param('id') id: string,
  ): Promise<Commodity> {
    const commodity = await this.commoditiesService.findOne(id);

    commodity.title = updateCommodityDto.title;
    commodity.price = updateCommodityDto.price;
    commodity.type = updateCommodityDto.type;

    return this.commoditiesService.update(commodity);
  }

  @Delete(':id')
  @ApiResponse({
    status: codes.OK,
    description: 'Remove commodity by id',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.commoditiesService.remove(id);
  }
}
