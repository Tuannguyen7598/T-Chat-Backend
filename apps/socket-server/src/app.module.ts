import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { DatabaseModule } from "libs/share/model";
import { diskStorage } from "multer";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { dbProviders } from "./message/database/db.provider";
import { MessageModule } from './message/message.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { MessageGateway } from "./message/message.gateway";


@Module({
  imports: [MessageModule, DatabaseModule,ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','..','..','/upload'),
    serveRoot: '/upload'
  })],
  controllers: [AppController],
  providers: [AppService, ...dbProviders],
})
export class AppModule { }
