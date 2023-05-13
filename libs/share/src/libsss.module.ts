import { Module } from '@nestjs/common';
import { LibsssService } from './libsss.service';

@Module({
  providers: [LibsssService],
  exports: [LibsssService],
})
export class LibsssModule {}
