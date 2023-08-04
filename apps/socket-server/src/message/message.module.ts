import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { DatabaseModule } from 'libs/share/model';
import { dbProviders } from './database/db.provider';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [DatabaseModule, JwtModule.register({
    secret: "tuan",
    publicKey: "123",
    privateKey: "2323",
    signOptions: {
      expiresIn: 7 * 60 * 60 * 60,
    },
  })],
  providers: [MessageGateway, MessageService, ...dbProviders, JwtService],
  exports: [MessageGateway]
})
export class MessageModule { }
