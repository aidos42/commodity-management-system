import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CommoditiesModule } from '../../src/commodities/commodities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommodityDto } from '../../src/commodities/dto/commodity.dto';
import * as codes from 'http-codes';

describe('positive cases', () => {
  const commodity = {
    title: 'mucguffin',
    price: 42,
    type: 'muffin',
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          autoLoadEntities: true,
          synchronize: true,
        }),
        CommoditiesModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create new commodity by POST', () => {
    return request(app.getHttpServer())
      .post('/api/commodities')
      .send(commodity as CommodityDto)
      .expect(codes.CREATED)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('should return all commodities by GET', () => {
    return request(app.getHttpServer())
      .get('/api/commodities')
      .expect(codes.OK)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('should one commodity by GET', () => {
    return request(app.getHttpServer())
      .get('/api/commodities/1')
      .expect(codes.OK)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });
});
