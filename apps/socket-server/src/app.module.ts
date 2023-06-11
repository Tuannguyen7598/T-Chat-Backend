import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessageModule } from './message/message.module';
import { DatabaseModule } from "libs/share/model";
import { dbProviders } from "./message/database/db.provider";
import { MulterModule } from "@nestjs/platform-express";


@Module({
  imports: [MessageModule,DatabaseModule,MulterModule.register({
    dest:'./upload'
  })],
  controllers: [AppController],
  providers: [AppService,...dbProviders],
})
export class AppModule { }
