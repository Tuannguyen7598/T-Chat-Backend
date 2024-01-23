import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ApiModule } from "./api/api.module";
import { TransportModule } from "./transport/transport.module";
import { BusinessLogicModule } from "./core.business/business-logic.module";
@Module({
	imports: [ApiModule, TransportModule, BusinessLogicModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
