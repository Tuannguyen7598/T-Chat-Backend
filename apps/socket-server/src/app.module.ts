import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessageModule } from './message/message.module';
import { DatabaseModule } from "libs/share/model";
import { dbProviders } from "./message/database/db.provider";


@Module({
  imports: [MessageModule,DatabaseModule],
  controllers: [AppController],
  providers: [AppService,...dbProviders],
})
export class AppModule { }
