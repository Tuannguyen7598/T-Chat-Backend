import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(@Query('code') code:string): string {
    console.log('/',code);
    
    return 'Hello World!';
  }
}
