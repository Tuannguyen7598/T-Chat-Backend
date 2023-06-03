import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { DatabaseModule } from 'libs/share/model';
import { dbProviders } from './database/db.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[DatabaseModule, JwtModule.register({
    secret: "tuan",
    signOptions: {
      expiresIn: 86400,
    },
  }),],
  providers: [MessageGateway, MessageService,...dbProviders]
})
export class MessageModule {}
