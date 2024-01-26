import { Module } from "@nestjs/common";
import { AuthController } from "./user/auth.controller";
import { BusinessLogicModule } from "../core.business/business-logic.module";

@Module({
	imports: [BusinessLogicModule],
	controllers: [AuthController],
	providers: [],
})
export class ApiModule {}
