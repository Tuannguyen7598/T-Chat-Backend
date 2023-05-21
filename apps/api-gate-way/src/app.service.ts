import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): string {
    
    return 'Hello World!';
  }
}
