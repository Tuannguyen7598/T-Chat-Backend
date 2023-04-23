import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/model/dbConnect/dbconnect.modul";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { dbProviders, hashPasswordProviders } from "./database/db.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, ...dbProviders, ...hashPasswordProviders],
})
export class AuthModule {}
