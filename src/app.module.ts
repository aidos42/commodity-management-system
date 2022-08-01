import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Commodity } from './commodities/commodity.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Commodity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
