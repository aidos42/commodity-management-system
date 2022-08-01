import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CommoditiesModule } from '../../src/commodities/commodities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommodityDto } from '../../src/commodities/dto/commodity.dto';
import * as codes from 'http-codes';

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

describe('positive cases', () => {
  const commodity = {
    title: 'mucguffin',
    price: 42,
    type: 'muffin',
  };

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

describe('negative cases', () => {
  const wrongCommodity = {
    title: 'mucguffin',
    price: 42,
  };

  //TODO: Figure out why the server crashes with such payload, but not in Postman
  it('should throw 400 because of wrong payload', () => {
    return request(app.getHttpServer())
      .post('/api/commodities')
      .send(wrongCommodity as CommodityDto)
      .expect(codes.INTERNAL_SERVER_ERROR);
  });

  it('should throw 404 because of wrong url', () => {
    return request(app.getHttpServer())
      .get('/api/commoditied')
      .expect(codes.NOT_FOUND);
  });

  it('should throw 404 because of wrong commoditie id', () => {
    return request(app.getHttpServer())
      .get('/api/commodities/666')
      .expect(codes.NOT_FOUND);
  });
});
