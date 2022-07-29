import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  index(): string {
    //TODO: a simple implementation of page to show commodities
    return 'Please, use /api/commodities for interactions with aplication.';
  }
}
