import { Module } from "@nestjs/common";
import { databaseProviders } from "./dbconnect.provide";

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
