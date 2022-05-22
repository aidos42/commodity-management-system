import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommoditiesModule } from './commodities/commodities.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CommoditiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
