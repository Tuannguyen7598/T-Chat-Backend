import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";
import { Model } from "mongoose";
import { BoxChatPerSonalDto } from "libs/share/model";


@Controller()
export class AppController {
  constructor(

    private readonly appService: AppService) { }


}
