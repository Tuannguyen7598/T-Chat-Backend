import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { diskStorage } from "multer";
import { AppService } from "./app.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Message } from "libs/share/model";

@Controller()
export class AppController {
  constructor(

    private readonly appService: AppService) { }

  @Post('image')
  @UseInterceptors(
    FilesInterceptor('files', null, {
      storage: diskStorage({
        destination: './upload', // Thư mục lưu trữ tệp
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 10, // Giới hạn kích thước tệp tin (ở đây là 10MB)
      },
    }),
  )
  async upload(@UploadedFiles() files: any,@Body() body:any): Promise<any> {
    console.log(files);
    const bodyParser:Message = JSON.parse(body.body)
    console.log(bodyParser);
    
    
    return "ok"
  }
}
