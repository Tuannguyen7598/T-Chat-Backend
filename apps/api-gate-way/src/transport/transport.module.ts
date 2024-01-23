import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TransportController } from "./transport.controller";
import { TransportService } from "./transport.service";

@Module({
	imports: [],
	controllers: [],
	providers: [TransportService, TransportController],
})
export class TransportModule {}
