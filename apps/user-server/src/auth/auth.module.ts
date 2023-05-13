import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { dbProviders, hashPasswordProviders } from "./database/db.provider";
import { DatabaseModule } from "libs/share/model";



@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, ...dbProviders, ...hashPasswordProviders],
})
export class AuthModule { }
