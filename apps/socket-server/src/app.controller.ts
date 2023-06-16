import { Body, Controller, Inject, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ConfigSocketServer, Message } from "libs/share/model";
import { RequestDataInterceptor } from "libs/share/model/lib/interceptor/upload_file.interceptor";
import { AppService } from "./app.service";
import * as fs from 'fs'
import { Model } from "mongoose";


@Controller()
export class AppController {
  constructor(
    @Inject("MESSAGE_MODEL") private messageModel: Model<Message>,
    private readonly appService: AppService) { }

  @Post('image')
  @UseInterceptors( RequestDataInterceptor,
    FilesInterceptor('files'),
  )
  async upload(@UploadedFiles() files:Array<Express.Multer.File> ,@Body() data:any): Promise<any> {
   
    let message:Message = JSON.parse(data.body)

    
    files.forEach((file) => {
      const path = `./upload/${message.from}`
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
      }
      fs.writeFileSync(`${path}/${file.originalname}`,file.buffer)
      message.pathImg.push(`${ConfigSocketServer.host}:${ConfigSocketServer.port}/upload/${message.from}/${file.originalname}`)
    })
    await this.messageModel.create(message)
    
    return "ok"
  }
}
