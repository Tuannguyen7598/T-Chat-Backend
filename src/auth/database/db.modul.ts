import { Module } from "@nestjs/common";
import { dbProviders, hashPasswordProviders } from "./db.provider";

@Module({
  providers: [...dbProviders, ...hashPasswordProviders],
  exports: [...dbProviders, ...hashPasswordProviders],
})
export class DBModule {}
