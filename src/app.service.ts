import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Please, use /api/commodities for interactions with aplication.';
  }
}
