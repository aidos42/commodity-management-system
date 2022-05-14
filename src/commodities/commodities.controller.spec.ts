import { Test, TestingModule } from '@nestjs/testing';
import { CommoditiesController } from './commodities.controller';
import { CommoditiesService } from './commodities.service';

describe('CommoditiesController', () => {
  let commoditiesController: CommoditiesController;

  const commodities = [
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommoditiesController],
      providers: [CommoditiesService],
    }).compile();

    commoditiesController = module.get<CommoditiesController>(
      CommoditiesController,
    );
  });

  describe('positive cases', () => {
    it('should return commodities array', () => {
      expect(commoditiesController.getAll()).toStrictEqual(commodities);
    });

    it('should return proper commodity', () => {
      expect(commoditiesController.getById('1')).toStrictEqual(commodities[1]);
    });

    it('should return same commodity', () => {
      const newCommodity = {
        title: 'oi!',
        price: 123,
        id: '4',
      };

      expect(commoditiesController.create(newCommodity)).toStrictEqual(
        newCommodity,
      );
    });
  });
});
