import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";
import { Model } from "mongoose";
import { BoxChatDto } from "libs/share/model";

@Controller()
export class AppController {
  constructor(
    @Inject("MESSAGE_MODEL") private messageModel: Model<BoxChatDto>,
    private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const a =this.messageModel.create(BoxChatDto.createObj())
    console.log(BoxChatDto.createObj());
    
    return this.appService.getHello();
  }
}
