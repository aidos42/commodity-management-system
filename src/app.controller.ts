import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index.pug')
  async index() {
    const list = await this.appService.index();

    return { commodities: list };
  }
}
