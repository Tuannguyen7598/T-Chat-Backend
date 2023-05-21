import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { DatabaseModule } from 'libs/share/model';
import { dbProviders } from './database/db.provider';

@Module({
  imports:[DatabaseModule],
  providers: [MessageGateway, MessageService,...dbProviders]
})
export class MessageModule {}
