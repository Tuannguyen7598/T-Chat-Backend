import { Module } from "@nestjs/common";
import { databaseSocketServerProviders, databaseUserServerProviders } from "./dbconnect.provide";


@Module({
  providers: [...databaseUserServerProviders,...databaseSocketServerProviders],
  exports: [...databaseUserServerProviders,...databaseSocketServerProviders],
})
export class DatabaseModule {}
