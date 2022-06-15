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
} from '@nestjs/common';
import { Commodity } from './commodity.entity';
import { CommoditiesService } from './commodities.service';
import { CommodityDto } from './dto/commodity.dto';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('commodities')
@Controller('api/commodities')
export class CommoditiesController {
  constructor(private readonly commoditiesService: CommoditiesService) {}

  @Get()
  @ApiResponse({
    status: 200,
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
    status: 200,
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
    status: 201,
    description: 'create commodity',
    type: Commodity,
  })
  @ApiBody({ type: CommodityDto })
  create(@Body() commodityDto: CommodityDto): Promise<Commodity> {
    const commodity = new Commodity();
    commodity.title = commodityDto.title;
    commodity.price = commodityDto.price;

    return this.commoditiesService.create(commodity);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'update commodity by id',
    type: Commodity,
  })
  @ApiBody({ type: CommodityDto })
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
  @ApiResponse({
    status: 200,
    description: 'Remove commodity by id',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.commoditiesService.remove(id);
  }
}
